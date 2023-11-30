export type Phonetic = {
  text: string;
  audio?: string;
};

export type Definition = {
  definition: string;
  example?: string;
  synonyms: string[];
  antonyms: string[];
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Definition[];
};

export type WordData = {
  word: string;
  phonetic?: string;
  phonetics: Phonetic[];
  origin?: string;
  meanings: Meaning[];
};

export type SearchResult = WordData[];
