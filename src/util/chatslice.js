import { createSlice } from "@reduxjs/toolkit";

const chatslice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessages: (state, action) => {
      state.messages.unshift(action.payload);
    },
  },
});
export const { addMessages } = chatslice.actions;
export default chatslice.reducer;
