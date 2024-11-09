// currentTrackReducer.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { currentTrack } from "../../types/type3"; // Adjust according to your types

interface CurrentTrackState {
  track: currentTrack | null;
  trackList: currentTrack[];
  volume: number; // Store volume state
}

const initialState: CurrentTrackState = {
  track: JSON.parse(localStorage.getItem("currentTrack") || "null"),
  trackList: [],
  volume: 50, // Default to 50% volume
};

const currentTrackSlice = createSlice({
  name: "currentTrack",
  initialState,
  reducers: {
    setCurrentTrack(state, action: PayloadAction<currentTrack | null>) {
      state.track = action.payload;
    },
    setTrackList(state, action: PayloadAction<currentTrack[]>) {
      state.trackList = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
  },
});

export const { setCurrentTrack, setVolume, setTrackList } =
  currentTrackSlice.actions;
export default currentTrackSlice.reducer;
