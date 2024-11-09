import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Playlist } from "../../types/type"; // Import your types
import { RootState } from "../feature/store";
import { CurrentTrackResponse, Artist } from "../../types/type2";

const spotifyApi = createApi({
  reducerPath: "spotifyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.spotify.com/v1",
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth.token;

      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchPlaylists: builder.query<
      {
        items: Playlist[];
      },
      void
    >({
      query: () => "/me/playlists",
      transformResponse: async (response: { items: Playlist[] }) => {
        const playlistsWithTracks = await Promise.all(
          response.items.map(async (playlist) => {
            const tracksResponse = await fetch(
              `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem(
                    "AccessToken"
                  )}`,
                  "Content-Type": "application/json",
                },
              }
            );

            const tracksData = await tracksResponse.json();

            return {
              ...playlist,
              images: playlist.images,
              tracks: tracksData.items.map((track: any) => track.track),
            };
          })
        );

        return { items: playlistsWithTracks }; // Return the modified response
      },
    }),
    getCurrentTrack: builder.query<any, void>({
      query: () => "/me/player/currently-playing",
      transformResponse: (response: CurrentTrackResponse) => {
        // console.log("res", response);

        if (response && response.item) {
          return {
            name: response.item.name,
            artist: response.item.artists.map((artist: Artist) => artist.name),
            duration: response.progress_ms,
            progress_ms: response.timestamp,
            images: response.item.album.images.map((img) => img.url),
          };
        }
        return null;
      },
    }),
    getCurrentUserProfile: builder.query<any, void>({
      query: () => "/me",
      transformResponse: (response) => {
        // console.log("User_Profile", response);
        return response;
      },
    }),
  }),
});

export const {
  useFetchPlaylistsQuery,
  useGetCurrentTrackQuery,
  useGetCurrentUserProfileQuery,
} = spotifyApi;
export default spotifyApi;
