import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn } from 'next-auth/react';
import NextLink from 'next/link';
import Image from 'next/image';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Link } from '@prisma/client';
import { CHALLENGES, RANDOM_CHALLENGE, THEMES } from '../constants';
import toast from 'react-hot-toast';
import {
  ArrowRight,
  ArrowDown,
  ChevronDown,
  HelpCircle,
  Check,
  Eye,
  EyeOff,
  Link as LinkIcon,
  AlertOctagon,
  Sliders,
} from 'react-feather';
import { Listbox, RadioGroup } from '@headlessui/react';

const HomePage: NextPage = () => {
  const [targetUrl, setTargetUrl] = useState('');
  const [selectedChallenge, setSelectedChallenge] = useState(RANDOM_CHALLENGE);
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]!);
  const [selectedSlugType, setSelectedSlugType] = useState('sketchy');
  const [isCreatingLink, setIsCreatingLink] = useState(false);

  const router = useRouter();
  const { data: session } = useSession();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsCreatingLink(true);

    const response = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        targetUrl: formattedUrl(targetUrl),
        challenge: selectedChallenge.name,
        theme: selectedTheme.name,
        slugType: selectedSlugType,
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
    if (
      ![RANDOM_CHALLENGE, ...CHALLENGES].some(
        (o) => o.name === selectedChallenge.name
      )
    )
      return "That challenge doesn't exist";
    if (!THEMES.some((o) => o.name === selectedTheme.name))
      return "That theme doesn't exist";
  };

  const formattedUrl = (url: string) => {
    return url.startsWith('http') ? url : `http://${url}`;
  };

  return (
    <>
      <Head>
        <title>Sketchy link shortener | cooldownload.software</title>
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
              A really sketchy link shortener
            </h1>
            <p>Make any link look questionable and add janky obstacles.</p>
            <div className="flex flex-col gap-4 items-start mt-8 sm:flex-row">
              <NextLink href="https://youtube.com">
                <a className="bg-gray-50 p-4 rounded-lg">youtube.com</a>
              </NextLink>
              <ArrowRight
                className="text-gray-300 hidden flex-shrink-0 mt-4 sm:block"
                aria-label="turns into"
              />
              <ArrowDown
                className="text-gray-300 flex-shrink-0 ml-3 sm:hidden"
                aria-label="turns into"
              />
              <NextLink href="https://cooldownload.software/bitcoin.fr-fast.account.docx/support-0OMBJkqyHb2.2mM-3uM2.mov.online">
                <a className="bg-gray-50 text-blue-500 font-medium p-4 rounded-lg break-all sm:break-normal">
                  cooldownload.software/bitcoin.fr-fast.account.docx/support-0OMBJkqyHb2.2mM-3uM2.mov.online
                </a>
              </NextLink>
            </div>
          </section>
          <section>
            <form
              action="/api/links"
              method="post"
              className="flex flex-col gap-8 bg-gray-50 p-4 rounded-lg"
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
                  <div className="flex items-center gap-2 mb-2">
                    <label htmlFor="challenge" className="block font-medium">
                      Select challenge
                    </label>
                    <NextLink href="#challenges">
                      <a>
                        <HelpCircle className="w-4 h-4 text-gray-500" />
                      </a>
                    </NextLink>
                  </div>
                  <Listbox
                    name="challenge"
                    value={selectedChallenge}
                    onChange={setSelectedChallenge}
                  >
                    {({ open }) => (
                      <div className="relative">
                        <Listbox.Button className="flex items-center w-full bg-white border border-gray-200 px-4 py-3 rounded-lg cursor-default">
                          <span className="flex-grow text-left">
                            {selectedChallenge.friendlyName}
                          </span>
                          <ChevronDown
                            className={
                              'text-gray-500 transition-transform' +
                              (open ? ' rotate-180' : '')
                            }
                          />
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-30 w-full max-h-64 bg-white border border-gray-200 shadow-lg mt-2 py-2 rounded-lg overflow-auto">
                          {[RANDOM_CHALLENGE, ...CHALLENGES].map(
                            (challenge) => (
                              <Listbox.Option
                                key={challenge.name}
                                value={challenge}
                                className={({ selected, active }) =>
                                  'flex items-center cursor-default select-none py-1 px-4' +
                                  (selected ? ' font-bold' : '') +
                                  (active ? ' bg-gray-100' : '')
                                }
                              >
                                {({ selected }) => (
                                  <>
                                    <span className="flex-grow">
                                      {challenge.friendlyName}
                                    </span>
                                    {selected && (
                                      <Check className="text-blue-500" />
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            )
                          )}
                        </Listbox.Options>
                      </div>
                    )}
                  </Listbox>
                </div>
                <div className="w-full">
                  <label htmlFor="theme" className="block font-medium mb-2">
                    Select theme
                  </label>
                  <Listbox
                    name="theme"
                    value={selectedTheme}
                    onChange={setSelectedTheme}
                  >
                    {({ open }) => (
                      <div className="relative">
                        <Listbox.Button className="flex items-center w-full bg-white border border-gray-200 px-4 py-3 rounded-lg cursor-default">
                          <span className="flex-1 text-left">
                            {selectedTheme.friendlyName}
                          </span>
                          <ChevronDown
                            className={
                              'text-gray-500 transition-transform' +
                              (open ? ' rotate-180' : '')
                            }
                          />
                        </Listbox.Button>
                        <Listbox.Options className="absolute z-30 w-full max-h-60 bg-white border border-gray-200 shadow-lg mt-2 py-2 rounded-lg overflow-auto">
                          {THEMES.map((theme) => (
                            <Listbox.Option
                              key={theme.name}
                              value={theme}
                              className={({ selected, active }) =>
                                'flex items-center cursor-default select-none py-1 px-4' +
                                (selected ? ' font-bold' : '') +
                                (active ? ' bg-gray-100' : '')
                              }
                            >
                              {({ selected }) => (
                                <>
                                  <span className="flex-grow">
                                    {theme.friendlyName}
                                  </span>
                                  {selected && (
                                    <Check className="text-blue-500" />
                                  )}
                                </>
                              )}
                            </Listbox.Option>
                          ))}
                        </Listbox.Options>
                      </div>
                    )}
                  </Listbox>
                </div>
              </div>
              <div>
                <label htmlFor="slugtype" className="block font-medium mb-2">
                  How should the link look?
                </label>
                <RadioGroup
                  value={selectedSlugType}
                  onChange={setSelectedSlugType}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <RadioGroup.Option value="sketchy">
                    {({ checked }) => (
                      <div
                        className={`flex items-center gap-2 bg-white border-2 px-4 py-3 rounded-lg cursor-pointer ${
                          checked ? 'border-blue-500' : 'border-transparent'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border border-gray-200 rounded-full ${
                            checked ? 'border-4 border-blue-500' : ''
                          }`}
                        ></div>
                        <span>Sketchy</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                  <RadioGroup.Option value="really-sketchy">
                    {({ checked }) => (
                      <div
                        className={`flex items-center gap-2 bg-white border-2 px-4 py-3 rounded-lg cursor-pointer ${
                          checked ? 'border-blue-500' : 'border-transparent'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 border border-gray-200 rounded-full ${
                            checked ? 'border-4 border-blue-500' : ''
                          }`}
                        ></div>
                        <span>Really sketchy</span>
                      </div>
                    )}
                  </RadioGroup.Option>
                </RadioGroup>
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
                  <p className="font-medium">
                    Tracking {session ? 'enabled' : 'disabled'}
                  </p>
                  {!session && (
                    <NextLink href="#" className="text-gray-500">
                      <a
                        onClick={() => signIn('discord')}
                        className="text-gray-500 underline"
                      >
                        Sign in with Discord to enable
                      </a>
                    </NextLink>
                  )}
                </div>
              </div>
              <Button htmlButtonType="submit" isLoading={isCreatingLink}>
                Create sketchy link
              </Button>
            </form>
          </section>
          <section>
            <h2 className="text-2xl font-semibold mb-4">Features</h2>
            <p className="mb-8">Why you should use this stupid thing.</p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
              <li className="flex flex-col gap-4 flex-1 border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center bg-blue-200 w-12 h-12 rounded-full">
                  <LinkIcon />
                </div>
                <h3 className="font-bold">Sketchy links</h3>
                <p>
                  The links look like they will infect your computer with 15
                  Internet Explorer toolbars.
                </p>
              </li>
              <li className="flex flex-col gap-4 flex-1 border border-gray-200 p-6 rounded-lg">
                <div className="flex items-center justify-center bg-red-200 w-12 h-12 rounded-full">
                  <AlertOctagon />
                </div>
                <h3 className="font-bold">Insane CAPTCHAs</h3>
                <p>
                  People who click your link need to complete a ridiculous
                  challenge before being redirected.
                </p>
              </li>
              <li className="flex flex-col gap-4 flex-1 border border-gray-200 p-6 rounded-lg">
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
          <section id="challenges" className="scroll-mt-8">
            <h2 className="text-2xl font-semibold mb-4">Challenges</h2>
            <p className="mb-8">
              CAPTCHAs taken to absurd heights. Visitors need to complete one
              before they are redirected to the destination website.
            </p>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {CHALLENGES.map((challenge) => (
                <li
                  key={challenge.name}
                  className="border border-gray-200 p-6 rounded-lg"
                >
                  <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-6">
                    <Image
                      src={challenge.demoUrl}
                      alt="Screen recording"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <h3 className="font-bold mb-2">{challenge.friendlyName}</h3>
                  <p>{challenge.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default HomePage;
