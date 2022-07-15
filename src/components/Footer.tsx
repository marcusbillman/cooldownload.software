import React, { FC } from 'react';
import NextLink from 'next/link';

interface Props {}

const Footer: FC<Props> = () => {
  return (
    <>
      <footer className="mt-16">
        <div className="container flex flex-col items-center gap-2 lg:flex-row lg:gap-12 px-4 py-8 mx-auto text-gray-500">
          <p className="font-bold">
            <NextLink href="/">cooldownload.software</NextLink>
          </p>
          <p>
            A dumb idea by{' '}
            <span className="underline">
              <NextLink href="https://marcusbillman.com">
                Marcus Billman
              </NextLink>
            </span>
          </p>
          <p>
            Source code on{' '}
            <span className="underline">
              <NextLink href="https://github.com/marcusbillman/cooldownload.software">
                GitHub
              </NextLink>
            </span>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
