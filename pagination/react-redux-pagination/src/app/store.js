import { configureStore } from "@reduxjs/toolkit";
import modules from "./modules";

// combine 한 reducer 들을 modules 그 자체로 넣는다.
export const store = configureStore({
  reducer: modules,
  devTools: true,
  middleware: [],
});
