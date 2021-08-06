import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import user from "./user";
import sidebar from "./sidebar";
import category from "./category";
import publisher from './publisher';
import supplier from './supplier';
import author from './author';
import book from './book';
import select from './select';

const reducer = combineReducers({
  user,
  sidebar,
  category,
  publisher,
  supplier,
  author,
  book,
  select,
});

const store = configureStore({
  reducer,
});

export default store;
