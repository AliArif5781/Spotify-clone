export interface currentTrack {
  id: string;
  name: string;
  popularity: number;
  type: string;
  duration_ms: number;
  preview_url: string;
  external_urls: {
    spotify: string;
  };
  artists: Artists[];
  album: Album;
}
export interface Artists {
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface Album {
  album_type: string;
  artists: Artist[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
export interface Image {
  height: number;
  url: string;
  width: number;
}
