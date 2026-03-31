import { configureStore } from "@reduxjs/toolkit";
import navslice from "./navslice";
import searchslice from './searchslice'
import chatslice from './chatslice'

const store = configureStore({
  reducer: {
    nav: navslice,
    search:searchslice,
    chat:chatslice,
  },
});
export default store;
