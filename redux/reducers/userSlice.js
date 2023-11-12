import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUserData: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearUserData: () => {
      return {};
    },
  },
});

export const { setUserData, clearUserData } = userSlice.actions;
export const selectUser = (state) => state.user;
export default userSlice.reducer;
