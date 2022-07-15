import React, { FC, useEffect } from 'react';
import type { ChallengeProps } from './';
import Image from 'next/image';
import CircularSlider from '@fseehawer/react-circular-slider';

const RotateImageChallenge: FC<ChallengeProps> = ({ onComplete }) => {
  const [imageUrl, setImageUrl] = React.useState('');
  const [sliderValue, setSliderValue] = React.useState(0);
  const [imageRotation, setImageRotation] = React.useState(0);
  const [offset, setOffset] = React.useState(0);

  useEffect(() => {
    setOffset(Math.random() * 360);

    async function fetchImage() {
      const response = await fetch(
        'https://random.imagecdn.app/v1/image?width=300&height=300&format=text'
      );
      setImageUrl(await response.text());
    }
    fetchImage();
  }, []);

  useEffect(() => {
    // setImageRotation(-1 * sliderValue ** 2 + offset);
    setImageRotation(
      0.000002 * sliderValue ** 5 -
        0.00062 * sliderValue ** 4 +
        0.04673 * sliderValue ** 3 -
        1.41755 * sliderValue ** 2 +
        16.0808 * sliderValue +
        offset
    );
  }, [sliderValue, offset]);

  const onClick = () => {
    const delta = Math.abs(imageRotation % 360);
    if (delta <= 5) onComplete();
  };

  const onChange = (value: number) => {
    setSliderValue(value);
  };

  return (
    <>
      <p>Rotate the image until it looks upright.</p>
      <div className="inline-block relative">
        {imageUrl && (
          <Image
            src={imageUrl}
            width={300}
            height={300}
            alt=""
            className="rounded-full transition-transform"
            style={{
              transform: `rotate(${imageRotation}deg)`,
            }}
          ></Image>
        )}
        <div className="absolute inset-0">
          <CircularSlider
            min={0}
            max={100}
            width={300}
            hideLabelValue={true}
            progressColorFrom="#00000000"
            progressColorTo="#00000000"
            onChange={onChange}
          />
        </div>
      </div>
      <button onClick={onClick} className="block">
        Done
      </button>
    </>
  );
};

export default RotateImageChallenge;
