import React, { FC, useEffect } from 'react';
import type { ChallengeProps } from './';

const WaitChallenge: FC<ChallengeProps> = ({ onComplete }) => {
  const [seconds, setSeconds] = React.useState(10);
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds < 1) return onComplete();
      if (seconds <= 7) {
        const random = Math.random();
        // 0 - 0.6   : go forward
        // 0.6 - 0.8 : do nothing
        // 0.8 - 1   : go back
        if (random < 0.6) setSeconds(seconds - 1);
        else if (random > 0.8) setSeconds(seconds + 1);
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  });
  return (
    <>
      <div className="flex flex-col gap-4">
        <p className="font-bold">
          Wait <span className="text-blue-500 font-bold">{seconds}</span>{' '}
          seconds to continue
        </p>
        <div className="w-full h-8 bg-gray-200 rounded-full">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-linear origin-left"
            style={{ width: `${(1 - seconds / 10) * 100}%` }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default WaitChallenge;
