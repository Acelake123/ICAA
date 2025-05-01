import { configureStore } from "@reduxjs/toolkit";

import auth from "./auth";
import ui from "./ui";
import data from "./data";
const store = configureStore({
  reducer: { 
    auth: auth,
     ui: ui,
    data: data},
});

export default store;
