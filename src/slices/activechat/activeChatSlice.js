import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    activeChat: null,
  },
  reducers: {
    activeChat: (state, action) => {
      state.activeChat = action.payload;
    },
  },
});

export const { activeChat } = chatSlice.actions;

export default chatSlice.reducer;
