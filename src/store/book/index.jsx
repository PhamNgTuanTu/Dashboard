import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "book",
  initialState: {
    books: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.books = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageBooksSuccess: (state, action) => {
      state.page = action.payload;
    },
    addBooksSuccess: (state, action) => {
      state.books.push(action.payload);
    },
    removeBooksSuccess: (state, action) => {
      const data = current(state)
      state.books = data.books.filter(book => book.id !== action.payload)
    },
    editBooksSuccess: (state, action) => {
      const data = current(state)
      const newBook = action.payload;
      const booksIndex = data.books.findIndex(book => book.id === newBook.id);
      if (booksIndex >= 0) {
        state.books[booksIndex] = newBook;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addBooksSuccess, removeBooksSuccess, editBooksSuccess,setPageBooksSuccess,setLoadingDataSuccess } = slice.actions;

export const setDataBook = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addBooks = (data) => async (dispatch) => {
  try {
    dispatch(addBooksSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removeBooks = (id) => async (dispatch) => {
  try {
    dispatch(removeBooksSuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editBooks = (data) => async (dispatch) => {
  try {
    dispatch(editBooksSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageBooks = (status) => async (dispatch) => {
  try {
    dispatch(setPageBooksSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setLoadingData = (status) => async (dispatch) => {
  try {
    dispatch(setLoadingDataSuccess(status));
  } catch (e) {
    return console.error(e.message);
  }
};