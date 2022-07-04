import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../../server/db/client';
import type { Link } from '../../types';

interface Props {
  link: Link;
}

const DetailsPage: NextPage<Props> = ({ link }) => {
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
          <div>
            <p>id: {link?.id}</p>
            <p>targetUrl: {link?.targetUrl}</p>
            <p>slug: {link?.slug}</p>
            <p>challenge: {link?.challenge}</p>
            <p>theme: {link?.theme}</p>
            <p>visitedCount: {link?.visitedCount}</p>
            <p>completedCount: {link?.completedCount}</p>
            <p>createdAt: {link?.createdAt}</p>
          </div>
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

export default DetailsPage;
