import React, { FC } from 'react';
import NextLink from 'next/link';
import { Link as LinkIcon } from 'react-feather';

interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  htmlButtonType?: 'button' | 'submit' | 'reset';
  isLoading?: boolean;
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FC<Props> = ({
  href,
  variant = 'primary',
  htmlButtonType = 'button',
  isLoading = false,
  onClick,
  children,
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-blue-500 text-white shadow-glow-blue';
      case 'secondary':
        return 'bg-gray-100';
      case 'destructive':
        return 'bg-red-500 text-white shadow-glow-red';
    }
  };

  return (
    <>
      {href ? (
        <NextLink href={href}>
          <a
            className={`${getVariantClasses()} w-max font-medium p-4 rounded-lg`}
          >
            {children}
          </a>
        </NextLink>
      ) : (
        <button
          type={htmlButtonType}
          onClick={onClick}
          className={`${getVariantClasses()} relative w-max font-medium p-4 rounded-lg`}
        >
          <div className={isLoading ? 'invisible' : ''}>{children}</div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <LinkIcon className="animate-spin" />
            </div>
          )}
        </button>
      )}
    </>
  );
};

export default Button;
