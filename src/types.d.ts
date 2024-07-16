export interface UserInterface {
  _id: string;
  email: string;
  username: string;
  token: string;
  avatar: any;
}

export type ComicItemArray = {
  thumbnail: { path: string; extension: string };
  _id: string;
  title: string;
  description: string;
  __v: number;
  isFavorite?: boolean;
};

export type ComicsType = {
  count: number;
  limit: number;
  results: ComicItemArray[];
};

export type CharacterItemArray = {
  _id: string;
  thumbnail: { path: string; extension: string };
  comics: string[];
  name: string;
  description: string;
  __v: 0;
  isFavorite?: boolean;
};

export type CharacterDataType = {
  _id: string;
  thumbnail: { path: string; extension: string };
  comics: ComicItemArray[];
  name: string;
  description: string;
  __v: 0;
  isFavorite?: boolean;
};
export type CharactersType = {
  count: number;
  limit: number;
  results: CharacterItemArray[];
};
