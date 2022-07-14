import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../../server/db/client';
import type { Link } from '../../types';
import NextLink from 'next/link';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';

interface Props {
  link: Link;
}

const LinkCreatedPage: NextPage<Props> = ({ link }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://cooldownload.software/${link.slug}`);
    alert('Copied to clipboard!');
  };

  return (
    <>
      <Head>
        <title>Sketchy link shortener | cooldownload.software</title>
        <meta name="description" content="Sketchy link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="container max-w-4xl flex flex-col gap-24 p-4 mx-auto">
          <section className="mt-12">
            <h1 className="text-3xl font-bold mb-4">
              Here&apos;s your sketchy link
            </h1>
            <p>
              Send it to someone to make them question you.
              <span className="text-gray-500 italic">
                (It’s all for funsies—please don’t be too evil)
              </span>
            </p>
          </section>
          <section>
            <div className="flex gap-4 items-center justify-between bg-blue-100 p-4 pl-6 rounded-lg mb-8">
              <p className="text-2xl font-medium underline">
                <NextLink href={`/${link.slug}`}>
                  {`cooldownload.software/${link.slug}`}
                </NextLink>
              </p>
              <Button onClick={copyToClipboard}>Copy</Button>
            </div>
            <div>
              <h2 className="font-medium mb-1">Redirects to</h2>
              <p className="text-blue-500 underline">
                <NextLink href={link.targetUrl}>{link.targetUrl}</NextLink>
              </p>
            </div>
          </section>
          <section>
            <Button href="/">Create another</Button>
          </section>
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

export default LinkCreatedPage;