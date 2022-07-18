import React, { FC } from 'react';
import NextLink from 'next/link';

interface Props {}

const Footer: FC<Props> = () => {
  return (
    <>
      <footer className="mt-16">
        <div className="container flex flex-col items-center gap-2 lg:flex-row lg:gap-12 px-4 py-8 mx-auto text-gray-500">
          <NextLink href="/">
            <a className="font-bold">cooldownload.software</a>
          </NextLink>
          <p>
            A dumb idea by{' '}
            <NextLink href="https://marcusbillman.com">
              <a className="underline">Marcus Billman</a>
            </NextLink>
          </p>
          <p>
            Source code on{' '}
            <NextLink href="https://github.com/marcusbillman/cooldownload.software">
              <a className="underline">GitHub</a>
            </NextLink>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
