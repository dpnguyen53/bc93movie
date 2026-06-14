import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "./../pages/HomeTemplate/Home/silce";
import authReducer from "./../pages/AdminTemplate/Auth/slice";

const store = configureStore({
  reducer: {
    // child reducers
    homeReducer,
    authReducer,
  },
});

export { store };
