import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../server/db/client';
import type { Link } from '../types';
import ButtonChallenge from '../components/challenges/ButtonChallenge';
import WaitChallenge from '../components/challenges/WaitChallenge';
import ThreeDTextChallenge from '../components/challenges/ThreeDTextChallenge';
import RotateImageChallenge from '../components/challenges/RotateImageChallenge';
import SelectSquaresChallenge from '../components/challenges/SelectSquaresChallenge';

interface Props {
  link: Link;
}

const ChallengePage: NextPage<Props> = ({ link }) => {
  const CHALLENGES = [
    'button',
    'wait',
    '3d-text',
    'rotate-image',
    'select-squares',
  ];

  let challengeToRender = link.challenge;
  if (!CHALLENGES.includes(link.challenge)) {
    const randomIndex = Math.floor(Math.random() * CHALLENGES.length);
    challengeToRender = CHALLENGES[randomIndex] as string;
  }

  const onComplete = async () => {
    await fetch(`/api/links/${link.slug}/completed-count`, {
      method: 'PUT',
    });
    window.location.href = link.targetUrl;
  };

  return (
    <>
      <Head>
        <title>Sketchy link shortener | cooldownload.software</title>
        <meta name="description" content="Sketchy link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="bg-gray-200">
        <div className="container p-10 mx-auto">
          <h1>cooldownload.software</h1>
        </div>
      </header>

      <main>
        <div className="container p-10 mx-auto">
          <h1>Please verify that you are human</h1>
          {challengeToRender === 'button' && (
            <ButtonChallenge onComplete={onComplete}></ButtonChallenge>
          )}
          {challengeToRender === 'wait' && (
            <WaitChallenge onComplete={onComplete}></WaitChallenge>
          )}
          {challengeToRender === '3d-text' && (
            <ThreeDTextChallenge onComplete={onComplete}></ThreeDTextChallenge>
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
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context?.params?.slug;
  if (typeof slug !== 'string') return { notFound: true };

  let link;
  try {
    link = await prisma.link.findFirst({
      where: { slug },
    });
  } catch (error) {
    return { notFound: true };
  }

  if (!link) return { notFound: true };

  return {
    props: {
      link: JSON.parse(JSON.stringify(link)),
    },
  };
};

export default ChallengePage;
