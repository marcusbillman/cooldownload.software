import React, { FC } from 'react';
import type { ChallengeProps } from './';

const ButtonChallenge: FC<ChallengeProps> = ({ onComplete }) => {
  return (
    <>
      <button onClick={onComplete} className="bg-blue-500 text-white">
        I am not a robot
      </button>
    </>
  );
};

export default ButtonChallenge;
