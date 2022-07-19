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
        <div className="container relative min-h-[6rem] px-4 py-6 mx-auto flex items-center justify-between gap-4">
          <NextLink href="/">
            <a>
              <Image
                src={'/assets/logo.svg'}
                alt="cooldownload.software"
                width={179}
                height={48}
              ></Image>
            </a>
          </NextLink>
          <nav className="flex gap-4 sm:gap-2 sm:bg-gray-100 sm:p-2 sm:rounded-full">
            <NextLink href="/">
              <a
                className={`${
                  router.asPath === '/' ? 'bg-white' : 'text-gray-500'
                } font-medium sm:px-4 sm:py-3 sm:rounded-full`}
              >
                Create
              </a>
            </NextLink>
            <NextLink href="/dashboard">
              <a
                className={`${
                  router.asPath === '/dashboard' ? 'bg-white' : 'text-gray-500'
                } font-medium sm:px-4 sm:py-3 sm:rounded-full`}
              >
                Track
              </a>
            </NextLink>
          </nav>
          <div className="hidden md:flex items-center gap-8">
            {session ? (
              <>
                <NextLink href="/dashboard">
                  <a href="">
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
                  </a>
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
