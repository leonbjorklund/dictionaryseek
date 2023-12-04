// Partials används för fält som saknas i API-svaret
export type SearchResult = Partial<WordData>;

export type WordData = {
  word: string;
  phonetic: string;
  phonetics: Partial<Phonetic>[];
  origin: string;
  meanings: Partial<Meaning>[];
};

export type Meaning = {
  partOfSpeech: string;
  definitions: Partial<Definition>[];
};

export type Definition = {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
};

export type Phonetic = {
  text: string;
  audio: string;
};
