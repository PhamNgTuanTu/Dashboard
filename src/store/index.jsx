import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import sidebar from "./sidebar";
import category from "./category";
import publisher from "./publisher";
import supplier from "./supplier";
import author from "./author";
import book from "./book";
import select from "./select";
import warehouse from "./warehouse";
import discount from "./discount";
import orders from "./order";
import home from "./home";
import slider from "./slider";

const reducer = combineReducers({
  user,
  sidebar,
  category,
  publisher,
  supplier,
  author,
  book,
  select,
  warehouse,
  discount,
  orders,
  home,
  slider,
});

const store = configureStore({
  reducer,
});

export default store;
