export interface UserInterface {
  // _id: string;
  email: string;
  username: string;
  // token: string;
  avatar: CloudinaryFile;
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

export interface CloudinaryFile {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  tags: string[];
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  original_filename: string;
}

export interface FavoriteInterface {
  _id: string;
  label: string;
  user: string;
  thumbnail: {
    path: string;
    extension: string;
  };
  title?: string;
  name?: string;
  description: string;
  __v: number;
}

type CharactersArrayOfficialType = {
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: CharacterOfficialType[];
  };
};
type CharacterOfficialType = {
  id: string;
  thumbnail: { path: string; extension: string };
  comics: AdditionalItemFromCharacterOfficialType;
  series: AdditionalItemFromCharacterOfficialType;
  // stories: AdditionalItemFromCharacterOfficialType;
  events: AdditionalItemFromCharacterOfficialType;
  urls: URLOfficialType[];
  modified: Date;
  name: string;
  description: string;
  resourceURI: string;
  isFavorite?: boolean;
};

type ComicArrayOfficialType = {
  attributionHTML: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: ComicOfficialType[];
  };
};
type ComicOfficialType = {
  id: string;
  isbn: string;
  format: string;
  modified: Date;
  title: string;
  description: string;
  resourceURI: string;
  textObjects: { type: string; la; guage: string; text: string }[];
  urls: URLOfficialType[];
  thumbnail: { path: string; extension: string };
  creatores: AdditionalItemFromCharacterOfficialType;
  characters: AdditionalItemFromCharacterOfficialType;
  events: AdditionalItemFromCharacterOfficialType;
  isFavorite?: boolean;
};

type AdditionalItemFromCharacterOfficialType = {
  available: number;
  collectionURI: string;
  items: ItemOfficlaType[];
  returned: number;
};

type URLOfficialType = {
  type: string;
  url: string;
};
type ItemOfficlaType = {
  resourceURI: string;
  name: string;
};
