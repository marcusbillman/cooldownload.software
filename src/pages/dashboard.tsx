import type { GetServerSideProps, NextPage } from 'next';
import Head from 'next/head';
import { prisma } from '../server/db/client';
import type { Link } from '@prisma/client';
import { CHALLENGES, THEMES } from '../constants';
import { unstable_getServerSession as getServerSession } from 'next-auth/next';
import { useSession, signIn } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import NextLink from 'next/link';
import toast from 'react-hot-toast';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MousePointer, CheckCircle } from 'react-feather';

interface Props {
  links: Link[];
}

const DashboardPage: NextPage<Props> = ({ links }) => {
  const { data: session } = useSession();

  const copyToClipboard = (string: string) => {
    navigator.clipboard.writeText(string);
    toast.success('Copied to clipboard!');
  };

  const getChallengeFriendlyName = (challengeName: string) => {
    const challenge = CHALLENGES.find((o) => o.name === challengeName);
    return challenge?.friendlyName || 'Random';
  };

  const getThemeFriendlyName = (themeName: string) => {
    const theme = THEMES.find((o) => o.name === themeName);
    return theme?.friendlyName || 'Default';
  };

  return (
    <>
      <Head>
        <title>Sketchy link shortener | cooldownload.software</title>
        <meta name="description" content="Sketchy link shortener" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {session ? (
        <main>
          <div className="container max-w-4xl flex flex-col gap-24 p-4 mx-auto">
            <section className="mt-12">
              <h1 className="text-3xl font-bold mb-4">
                {session.user?.name}&apos;s sketchy links
              </h1>
              <p>
                Here you can track all links that you have created. Links that
                you created while not being signed in aren’t trackable and
                therefore don’t show up here.
              </p>
            </section>
            <section>
              <ul className="flex flex-col gap-8">
                {links.map((link) => (
                  <li
                    className="border border-gray-200 rounded-lg"
                    key={link.id}
                  >
                    <div className="flex items-center justify-between gap-4 p-4 border-b border-gray-200">
                      <p className="font-medium underline">
                        <NextLink href={`/${link.slug}`}>
                          {`cooldownload.software/${link.slug}`}
                        </NextLink>
                      </p>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="secondary"
                          onClick={() =>
                            copyToClipboard(
                              `https://cooldownload.software/${link.slug}`
                            )
                          }
                        >
                          Copy
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => alert('Delete')}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-col gap-6 p-4">
                      <div className="flex">
                        <div className="flex-1">
                          <p className="font-medium mb-1">Redirects to</p>
                          <p className="underline">
                            <NextLink href={link.targetUrl}>
                              {link.targetUrl}
                            </NextLink>
                          </p>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">Date created</p>
                          <p>
                            {
                              new Date(link.createdAt as unknown as string)
                                .toISOString()
                                .split('T')[0]
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex-1">
                          <p className="font-medium mb-1">Challenge</p>
                          <p>{getChallengeFriendlyName(link.challenge)}</p>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium mb-1">Theme</p>
                          <p>{getThemeFriendlyName(link.theme)}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center bg-purple-200 w-12 h-12 rounded-full">
                              <MousePointer />
                            </div>
                            <div>
                              <p className="font-medium">Visited</p>
                              <p className="text-2xl font-medium">
                                {link.visitedCount}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-4">
                            <div className="flex items-center justify-center bg-green-200 w-12 h-12 rounded-full">
                              <CheckCircle />
                            </div>
                            <div>
                              <p className="font-medium">Completed</p>
                              <p className="text-2xl font-medium">
                                {link.completedCount}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      ) : (
        <main>
          <div className="container max-w-4xl flex flex-col gap-24 p-4 mx-auto">
            <section className="mt-12">
              <h1 className="text-3xl font-bold mb-4">Please sign in</h1>
              <p className="mb-8">
                You need to be signed in to manage links that you have created.
              </p>
              <Button onClick={signIn}>Sign in</Button>
            </section>
          </div>
        </main>
      )}

      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, authOptions);

  let links = null;
  if (session) {
    const data = await prisma.link.findMany({
      where: {
        userEmail: session.user?.email,
      },
    });
    links = JSON.parse(JSON.stringify(data));
  }

  return {
    props: {
      links,
      session,
    },
  };
};

export default DashboardPage;