import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../server/db/client';
import type { Link } from '@prisma/client';
import { useRouter } from 'next/router';
import Image from 'next/image';
import NextLink from 'next/link';
import { CHALLENGES } from '../constants';
import ButtonChallenge from '../components/challenges/ButtonChallenge';
import WaitChallenge from '../components/challenges/WaitChallenge';
import ThreeDTextChallenge from '../components/challenges/ThreeDTextChallenge';
import RotateImageChallenge from '../components/challenges/RotateImageChallenge';
import SelectSquaresChallenge from '../components/challenges/SelectSquaresChallenge';

interface Props {
  link: Link;
  challengeToRender: string;
}

const ChallengePage: NextPage<Props> = ({ link, challengeToRender }) => {
  const router = useRouter();

  const onComplete = async () => {
    await fetch(`/api/links/${link.slug}/completed-count`, {
      method: 'PUT',
    });
    router.push(link.targetUrl);
  };

  return (
    <>
      <Head>
        <title>cooldownload.software</title>
        <meta name="description" content="Awesome web link" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gradient-to-b from-blue-200">
        <div className="container relative min-h-[6rem] py-6 mx-auto flex gap-16 items-center justify-center">
          <div className="absolute left-4 cursor-pointer">
            <NextLink href="/">
              <Image
                src={'/assets/logo.svg'}
                alt="cooldownload.software"
                width={179}
                height={48}
              ></Image>
            </NextLink>
          </div>
          <ul className="hidden lg:flex gap-8">
            <li>Free Software</li>
            <li>New Deals</li>
            <li>Android Apps</li>
            <li className="hidden xl:block">Free PC Cleaner</li>
            <li className="hidden xl:block">Discount Codes</li>
          </ul>
        </div>
      </header>

      <div className="container p-4 mx-auto">
        <div className="md:hidden mb-8">
          <Image
            src="/assets/ads/rectangle-pc-cleaner.png"
            alt="PC Cleaner ad"
            width={361}
            height={301}
          ></Image>
        </div>
        <div className="hidden md:flex flex-shrink-0 justify-center gap-8 mb-8">
          <Image
            src="/assets/ads/banner-pc-cleaner.png"
            alt="PC Cleaner ad"
            width={875}
            height={109}
          ></Image>
        </div>
        <div className="xl:flex gap-8">
          <div className="hidden 2xl:block flex-shrink-0">
            <Image
              src="/assets/ads/sidebar-game.png"
              alt="Mobile game ad"
              width={193}
              height={721}
            ></Image>
          </div>
          <main className="flex-grow">
            <h1 className="text-3xl font-bold mb-2">
              Please verify that you are human
            </h1>
            <p className="text-gray-500 mb-8">
              Complete the task below to be redirected to your page
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              {challengeToRender === 'button' && (
                <ButtonChallenge onComplete={onComplete}></ButtonChallenge>
              )}
              {challengeToRender === 'wait' && (
                <WaitChallenge onComplete={onComplete}></WaitChallenge>
              )}
              {challengeToRender === '3d-text' && (
                <ThreeDTextChallenge
                  onComplete={onComplete}
                ></ThreeDTextChallenge>
              )}
              {challengeToRender === 'rotate-image' && (
                <RotateImageChallenge
                  onComplete={onComplete}
                ></RotateImageChallenge>
              )}
              {challengeToRender === 'select-squares' && (
                <SelectSquaresChallenge
                  onComplete={onComplete}
                ></SelectSquaresChallenge>
              )}
            </div>
            <div className="md:flex flex-row gap-8 mt-8">
              <Image
                src="/assets/ads/rectangle-antivirus.png"
                alt="Antivirus ad"
                width={361}
                height={301}
              ></Image>
              <Image
                src="/assets/ads/rectangle-pc-cleaner.png"
                alt="PC Cleaner ad"
                width={361}
                height={301}
              ></Image>
            </div>
          </main>
          <div className="hidden xl:block flex-shrink-0">
            <Image
              src="/assets/ads/sidebar-top-articles.png"
              alt="Top articles ad"
              width={193}
              height={721}
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug;
  if (typeof slug !== 'string') return { notFound: true };

  let link: Link;
  try {
    link = (await prisma.link.findFirst({
      where: { slug },
    })) as Link;
  } catch (error) {
    return { notFound: true };
  }
  if (!link) return { notFound: true };

  let challengeToRender = link.challenge;
  if (
    link.challenge === 'random' ||
    !CHALLENGES.some((o) => o.name === link.challenge)
  ) {
    const challengesExcludingRandom = CHALLENGES.filter(
      (o) => o.name !== 'random'
    );
    const randomIndex = Math.floor(
      Math.random() * challengesExcludingRandom.length
    );
    challengeToRender = challengesExcludingRandom[randomIndex]!.name;
  }

  await prisma.link.update({
    where: { slug },
    data: { visitedCount: { increment: 1 } },
  });

  return {
    props: {
      link: JSON.parse(JSON.stringify(link)),
      challengeToRender,
    },
  };
};

export default ChallengePage;
