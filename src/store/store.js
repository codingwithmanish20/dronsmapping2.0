import { configureStore } from "@reduxjs/toolkit";
import newprojectSlice from "./newprojectSlice";
import loadingslice from "./loadingslice";

const store = configureStore({
  reducer: {
    newprojects : newprojectSlice,
    loading:loadingslice
  },
});

export default store;