export interface Track {
  id: string;
  name: string;
  artists: Array<{ name: string }>;
  album: {
    name: string;
    images: Array<{ url: string }>;
    release_date?: string;
  };
  preview_url?: string | null;
  duration_ms?: number;
  external_ids?: { isrc?: string };
  isrc?: string;
}

export interface Playlist {
  id: string;
  name: string;
  images: Array<{ url: string }>;
  type?: string;
  owner?: {
    display_name: string;
  };
  tracks: Track[];
}

// export interface Track {
//   id: string;
//   name: string;
//   artists: Array<{ name: string }>;
//   album: {
//     name: string;
//     images: Array<{ url: string }>;
//     release_date?: string;
//   };
//   preview_url?: string | null;
//   duration_ms?: number;
//   external_ids?: { isrc?: string };
//   isrc?: string;
// }

// export interface PlayListData {
//   playList: Array<{
//     id: string;
//     name: string;
//     images?: Array<{ url: string }>;
//     type?: string;
//     owner?: {
//       display_name: string;
//     };
//     tracks: Track[];
//   }>;
// }

/*
  // export interface AccessToken {
  //   token: string | null;
  // }
  
  // interface Track {
  //   id: string;
  //   name: string;
  //   artists: Array<{ name: string }>;
  //   album: { name: string; images: Array<{ url: string }> };
  //   preview_url: string | null; // URL for audio preview
  // }
  
  // export interface Playlist {
  //   id: string;
  //   name: string;
  //   images: Array<{ url: string }>; // Added images property
  //   tracks: Track[];
  // }
   */
