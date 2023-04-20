import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import authReducer from "../auth/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    //  product: productSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from "../auth/authSlice";
// const store2 = configureStore({
//   home: homeReducer,
// });
