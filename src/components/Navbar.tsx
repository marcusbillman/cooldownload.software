import React, { FC } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Button from './Button';

interface Props {}

const Navbar: FC<Props> = () => {
  const router = useRouter();

  return (
    <>
      <header className="bg-white">
        <div className="container relative min-h-[6rem] px-4 py-6 mx-auto flex items-center justify-between">
          <NextLink href="/">
            <div>
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
              <li
                className={`${
                  router.asPath === '/' ? 'bg-white' : 'text-gray-500'
                } font-medium px-4 py-3 rounded-full`}
              >
                <NextLink href="/">Create</NextLink>
              </li>
              <li
                className={`${
                  router.asPath === '/track' ? 'bg-white' : 'text-gray-500'
                } font-medium px-4 py-3 rounded-full`}
              >
                <NextLink href="/track">Track</NextLink>
              </li>
            </ul>
          </nav>
          <div className="hidden md:block">
            <Button variant="secondary">Sign in with Discord</Button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
