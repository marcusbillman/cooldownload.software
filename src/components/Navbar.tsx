import React, { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import Button from './Button';

interface Props {}

const Navbar: FC<Props> = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <header className="bg-white">
        <div className="container relative min-h-[6rem] px-4 py-6 mx-auto flex items-center justify-between">
          <NextLink href="/">
            <div className="cursor-pointer">
              <Image
                src={'/assets/logo.svg'}
                alt="cooldownload.software"
                width={179}
                height={48}
              ></Image>
            </div>
          </NextLink>
          <nav>
            <ul className="flex gap-2 bg-gray-100 p-2 rounded-full">
              <NextLink href="/">
                <li
                  className={`${
                    router.asPath === '/' ? 'bg-white' : 'text-gray-500'
                  } font-medium px-4 py-3 rounded-full cursor-pointer`}
                >
                  Create
                </li>
              </NextLink>
              <NextLink href="/dashboard">
                <li
                  className={`${
                    router.asPath === '/dashboard'
                      ? 'bg-white'
                      : 'text-gray-500'
                  } font-medium px-4 py-3 rounded-full cursor-pointer`}
                >
                  Track
                </li>
              </NextLink>
            </ul>
          </nav>
          <div className="hidden md:flex items-center gap-8">
            {session ? (
              <>
                <NextLink href="/dashboard">
                  <div className="flex items-center gap-2 cursor-pointer">
                    {session.user?.image && (
                      <Image
                        src={session.user?.image}
                        alt={`${session.user?.name} avatar`}
                        width={32}
                        height={32}
                      ></Image>
                    )}
                    <p className="font-medium">{session.user?.name}</p>
                  </div>
                </NextLink>
                <Button variant="secondary" onClick={signOut}>
                  Sign out
                </Button>
              </>
            ) : (
              <Button variant="secondary" onClick={() => signIn('discord')}>
                Sign in with Discord
              </Button>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
