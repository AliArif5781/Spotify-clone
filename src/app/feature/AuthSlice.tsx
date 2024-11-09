// features/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: localStorage.getItem("AccessToken"),
  },
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("AccessToken", action.payload);
    },
    clearToken(state) {
      state.token = null;
      localStorage.removeItem("AccessToken");
    },
  },
});

export const { setToken, clearToken } = authSlice.actions;
export default authSlice.reducer;
