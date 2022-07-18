import Randomstring from 'randomstring';
import { words, separators, suffixes } from './wordlist.json';

const generateReallySketchySlug = () => {
  let slug = '';

  while (slug.length < 64) {
    const outcome = Math.random();

    if (outcome < 0.7) {
      const word = pickRandom(words);
      if (!slug.includes(word)) {
        slug += pickRandom(separators) + word;
      }
    } else if (outcome < 0.9) {
      const length = Math.floor(Math.random() * 10) + 2;
      slug += pickRandom(separators) + Randomstring.generate(length);
    } else {
      slug += pickRandom(suffixes);
    }
  }

  // Remove first character if it's a special character
  if (slug.match(/^[^a-zA-Z0-9]/)) {
    slug = slug.substring(1);
  }

  return slug;
};

const pickRandom = (array: any[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

export default generateReallySketchySlug;
