import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "author",
  initialState: {
    authors: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.authors = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageAuthorSuccess: (state, action) => {
      state.page = action.payload;
    },
    addAuthorSuccess: (state, action) => {
      state.authors.push(action.payload);
    },
    removeAuthorSuccess: (state, action) => {
      const data = current(state)
      state.authors = data.authors.filter(x => x.id !== action.payload)
    },
    editAuthorSuccess: (state, action) => {
      const data = current(state)
      const newAuthor = action.payload;
      const authorIndex = data.authors.findIndex(author => author.id === newAuthor.id);
      if (authorIndex >= 0) {
        state.authors[authorIndex] = newAuthor;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addAuthorSuccess, removeAuthorSuccess, editAuthorSuccess,setPageAuthorSuccess,setLoadingDataSuccess} = slice.actions;

export const setDataAuthor = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addAuthor = (data) => async (dispatch) => {
  try {
    dispatch(addAuthorSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removeAuthor = (id) => async (dispatch) => {
  try {
    dispatch(removeAuthorSuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editAuthor = (data) => async (dispatch) => {
  try {
    dispatch(editAuthorSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageAuthor = (status) => async (dispatch) => {
  try {
    dispatch(setPageAuthorSuccess(status));
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