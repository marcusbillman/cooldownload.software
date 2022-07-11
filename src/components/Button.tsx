import React, { FC } from 'react';
import NextLink from 'next/link';

interface Props {
  href?: string;
  variant?: 'primary' | 'secondary' | 'destructive';
  htmlButtonType?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children?: React.ReactNode;
}

const Button: FC<Props> = ({
  href,
  variant = 'primary',
  htmlButtonType = 'button',
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
        <div
          className={`${getVariantClasses()} w-max font-medium p-4 rounded-lg`}
        >
          <NextLink href={href}>{children}</NextLink>
        </div>
      ) : (
        <button
          type={htmlButtonType}
          onClick={onClick}
          className={`${getVariantClasses()} w-max font-medium p-4 rounded-lg`}
        >
          {children}
        </button>
      )}
    </>
  );
};

export default Button;
