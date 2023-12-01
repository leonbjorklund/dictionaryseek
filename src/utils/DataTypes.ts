export type Phonetic = {
  text: string;
  audio: string;
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

// Partials används för att hantera fält som saknas i API-svaret
export type WordData = {
  word: string;
  phonetic?: string;
  phonetics: Partial<Phonetic>[];
  origin?: string;
  meanings: Partial<Meaning>[];
};

export type SearchResult = Partial<WordData>;
