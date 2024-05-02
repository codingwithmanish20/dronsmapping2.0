import { configureStore } from "@reduxjs/toolkit";
import newprojectSlice from "./newprojectSlice";


const store = configureStore({
  reducer: {
    newprojects : newprojectSlice
  },
});

export default store;