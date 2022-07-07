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
      <p>
        Wait <span className="text-blue-500 font-bold">{seconds}</span> seconds
        to continue{' '}
      </p>
      <div className="w-full h-8 bg-gray-200">
        <div
          className="h-full bg-blue-500 transition-transform duration-1000 ease-linear origin-left"
          style={{ transform: `scaleX(${1 - seconds / 10})` }}
        ></div>
      </div>
    </>
  );
};

export default WaitChallenge;
