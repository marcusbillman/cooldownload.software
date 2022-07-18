import Randomstring from 'randomstring';
import WORDLIST from './wordlist.json';

const generateReallySketchySlug = () => {
  let slug = '';

  while (slug.length < 64) {
    const outcome = Math.random();

    if (outcome < 0.7) {
      const word = pickRandom(WORDLIST.words);
      if (!slug.includes(word)) {
        slug += pickRandom(WORDLIST.separators) + word;
      }
    } else if (outcome < 0.9) {
      const length = Math.floor(Math.random() * 10) + 2;
      slug += pickRandom(WORDLIST.separators) + Randomstring.generate(length);
    } else {
      slug += pickRandom(WORDLIST.extensions);
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
