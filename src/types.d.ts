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
