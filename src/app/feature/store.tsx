// app/store.tsx
import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice"; // Ensure the path is correct
import spotifyApi from "./SpotifyApiSlice"; // Import the API slice
import { setupListeners } from "@reduxjs/toolkit/query";
import currentTrackReducer from "./currentTrackReducer"; // New slice for current track state

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
    currentTrack: currentTrackReducer, // New reducer for current track
    [spotifyApi.reducerPath]: spotifyApi.reducer, // Use the API slice's reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializable state check
      immutableCheck: false, // Disable immutable state check
    }).concat(spotifyApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
