import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../../server/db/client';
import type { Link } from '@prisma/client';
import { useSession } from 'next-auth/react';
import NextLink from 'next/link';
import toast from 'react-hot-toast';
import Button from '../../components/Button';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Eye, EyeOff } from 'react-feather';

interface Props {
  link: Link;
}

const LinkCreatedPage: NextPage<Props> = ({ link }) => {
  const { data: session } = useSession();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://cooldownload.software/${link.slug}`);
    toast.success('Copied to clipboard!');
  };

  return (
    <>
      <Head>
        <title>Link created | cooldownload.software</title>
        <meta
          name="description"
          content="Mess with your friends by sending them questionable links using this sketchy link shortener."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <div className="container max-w-4xl flex flex-col gap-24 p-4 mx-auto">
          <section className="mt-12">
            <h1 className="text-4xl font-bold mb-4">
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
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center bg-blue-100 p-4 pl-6 rounded-lg mb-8">
              <NextLink href={`/${link.slug}`}>
                <a className="text-lg sm:text-2xl font-medium break-all">
                  {`cooldownload.software/${link.slug}`}
                </a>
              </NextLink>
              <Button onClick={copyToClipboard}>Copy</Button>
            </div>
            <div className="flex flex-col gap-8 sm:flex-row sm:gap-4">
              <div className="flex-grow">
                <h2 className="font-medium mb-1">Redirects to</h2>
                <NextLink href={link.targetUrl}>
                  <a className="text-blue-500 underline">{link.targetUrl}</a>
                </NextLink>
              </div>
              <div className="flex flex-grow items-center gap-4">
                {link.userEmail ? (
                  <div className="flex items-center justify-center bg-green-200 w-12 h-12 rounded-full">
                    <Eye />
                  </div>
                ) : (
                  <div className="flex items-center justify-center bg-red-200 w-12 h-12 rounded-full">
                    <EyeOff />
                  </div>
                )}
                <div>
                  <p className="font-medium">Tracking</p>
                  <p className="text-2xl">{session ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="flex items-center gap-4">
              <Button href="/">Create another</Button>
              {session && (
                <Button variant="secondary" href="/dashboard">
                  Go to tracking
                </Button>
              )}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  let slug = context?.params?.slug;
  if (Array.isArray(slug)) slug = slug.join('/');

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
