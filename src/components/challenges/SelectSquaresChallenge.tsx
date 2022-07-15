import React, { FC, useEffect } from 'react';
import type { ChallengeProps } from './';
import Image from 'next/image';
import { uniqueNamesGenerator, adjectives } from 'unique-names-generator';

const SelectSquaresChallenge: FC<ChallengeProps> = ({ onComplete }) => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [query, setQuery] = React.useState('');
  const [checkboxValues, setCheckboxValues] = React.useState(
    new Array(64).fill(false)
  );
  const [attempts, setAttempts] = React.useState(0);
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    setQuery(
      uniqueNamesGenerator({
        dictionaries: [adjectives],
      })
    );

    async function fetchImage() {
      const response = await fetch(
        'https://random.imagecdn.app/v1/image?width=512&height=512&format=text'
      );
      setImageUrl(await response.text());
    }
    fetchImage();
  }, []);

  const onCheckboxChange = (index: number) => {
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[index] = !newCheckboxValues[index];
    setCheckboxValues(newCheckboxValues);
    setErrorMessage('');
  };

  const onClick = () => {
    if (checkboxValues.filter((value) => value).length < 5) {
      setErrorMessage('You must select at least 5 squares');
      return;
    }
    setAttempts(attempts + 1);
    if (attempts >= 5) onComplete();
    if (attempts < 2 || Math.random() < 0.75) {
      setCheckboxValues(new Array(64).fill(false));
      setErrorMessage('Please try again');
      return;
    }
    onComplete();
  };

  return (
    <>
      <p>Select all squares that can be described as {query}.</p>
      <div className="relative grid grid-cols-[repeat(8,1fr)] grid-rows-[repeat(8,1fr)] max-w-lg aspect-square">
        {imageUrl && (
          <div className="absolute inset-0 -z-10">
            <Image src={imageUrl} width={512} height={512} alt=""></Image>
          </div>
        )}
        {checkboxValues.map((_, index) => (
          <input
            type="checkbox"
            key={index}
            checked={checkboxValues[index]}
            onChange={() => onCheckboxChange(index)}
            className="h-full opacity-10 checked:opacity-50 accent-blue-500"
          />
        ))}
      </div>
      <button onClick={onClick}>Verify</button>
      {errorMessage && <p>{errorMessage}</p>}
    </>
  );
};

export default SelectSquaresChallenge;
