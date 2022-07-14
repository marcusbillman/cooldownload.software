import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import { Link } from '@prisma/client';

const HomePage: NextPage = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [challenge, setChallenge] = useState('random');
  const [theme, setTheme] = useState('default');

  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetUrl,
        challenge,
        theme,
        userEmail: session?.user?.email,
      }),
    });
    const link: Link = await response.json();
    router.push(`/created/${link.slug}`);
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
            <h1 className="text-3xl font-bold mb-4">Make your links sketchy</h1>
            <p>
              Mess with your friends by sending them questionable links.
              <br />
              <span className="text-gray-500 italic">Example: </span>
              <span className="text-gray-500 italic underline">
                cooldownload.software/credit-card-loans/microsoft-supportcall.docx?Xsw6k=hg
              </span>
            </p>
          </section>
          <section>
            <form
              action="/api/links"
              method="post"
              className="flex flex-col gap-8"
              onSubmit={onSubmit}
            >
              <div>
                <label htmlFor="targetUrl" className="block font-medium mb-2">
                  Paste your normal link
                </label>
                <input
                  type="text"
                  name="targetUrl"
                  id="targetUrl"
                  value={targetUrl}
                  onChange={(e) => setTargetUrl(e.target.value)}
                  placeholder="https://marcusbillman.com"
                  required
                  className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
                />
              </div>
              <div className="flex flex-col gap-8 sm:flex-row sm:gap-4">
                <div className="w-full">
                  <label
                    htmlFor="challenge"
                    className="block  font-medium mb-2"
                  >
                    Select challenge
                  </label>
                  <select
                    name="challenge"
                    id="challenge"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    required
                    className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
                  >
                    <option value="random">Random</option>
                    <option value="wait">Wait</option>
                    <option value="3d-text">3D text</option>
                    <option value="rotate-image">Rotate image</option>
                    <option value="select-squares">Select squares</option>
                  </select>
                </div>
                <div className="w-full">
                  <label htmlFor="theme" className="block font-medium mb-2">
                    Select theme
                  </label>
                  <select
                    name="theme"
                    id="theme"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    required
                    className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
                  >
                    <option value="default">Default</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-200 w-12 h-12 rounded-full"></div>
                <div>
                  <p className="font-medium">Tracking</p>
                  <p className="text-2xl">{session ? 'Enabled' : 'Disabled'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Button htmlButtonType="submit">Create sketchy link</Button>
                {!session && (
                  <Button variant="secondary" onClick={signIn}>
                    Sign in to enable tracking
                  </Button>
                )}
              </div>
            </form>
          </section>
        </div>
      </main>
    </>
  );
};

export default HomePage;
