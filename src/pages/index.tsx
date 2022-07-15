import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from '@prisma/client';
import { CHALLENGES, THEMES } from '../constants';
import toast from 'react-hot-toast';
import {
  Eye,
  EyeOff,
  Link as LinkIcon,
  AlertOctagon,
  Sliders,
} from 'react-feather';

const HomePage: NextPage = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [challenge, setChallenge] = useState('random');
  const [theme, setTheme] = useState('default');

  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetUrl: formattedUrl(targetUrl),
        challenge,
        theme,
        userEmail: session?.user?.email,
      }),
    });
    const link: Link = await response.json();
    router.push(`/created/${link.slug}`);
  };

  const validateForm = () => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z\.-]+\.[a-z\.]{2,6}|[\d\.]+)([\/:?=&#]{1}[\da-z\.-]+)*[\/\?]?$/gim;

    if (!targetUrl.match(urlPattern)) return "That URL doesn't look right";
    if (!CHALLENGES.some((o) => o.name === challenge))
      return "That challenge doesn't exist";
    if (!THEMES.some((o) => o.name === theme))
      return "That theme doesn't exist";
  };

  const formattedUrl = (url: string) => {
    return url.startsWith('http') ? url : `http://${url}`;
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
                    {CHALLENGES.map((challenge) => (
                      <option key={challenge.name} value={challenge.name}>
                        {challenge.friendlyName}
                      </option>
                    ))}
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
                    {THEMES.map((theme) => (
                      <option key={theme.name} value={theme.name}>
                        {theme.friendlyName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {session ? (
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
              {session && (
                <p className="text-gray-500">
                  Tracking can only be viewed by you while signed in.
                </p>
              )}
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
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <p className="mb-8">Why you should use this stupid thing.</p>
            <ul className="flex flex-col gap-4 md:flex-row">
              <li className="flex flex-col gap-4 border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center bg-blue-200 w-12 h-12 rounded-full">
                  <LinkIcon />
                </div>
                <h3 className="font-bold">Sketchy links</h3>
                <p>
                  The links look like they will infect your computer with 15
                  Internet Explorer toolbars.
                </p>
              </li>
              <li className="flex flex-col gap-4 border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center bg-red-200 w-12 h-12 rounded-full">
                  <AlertOctagon />
                </div>
                <h3 className="font-bold">Sketchier CAPTCHAs</h3>
                <p>
                  Visitors that click your link need to solve a ridiculous
                  challenge before they are redirected.
                </p>
              </li>
              <li className="flex flex-col gap-4 border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center bg-purple-200 w-12 h-12 rounded-full">
                  <Sliders />
                </div>
                <h3 className="font-bold">Customise & track</h3>
                <p>
                  Select the challenge and how the page should look, and track
                  how many people click your link.
                </p>
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
