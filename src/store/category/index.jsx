import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "category",
  initialState: {
    category: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.category = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageCateSuccess: (state, action) => {
      state.page = action.payload;
    },
    addCategorySuccess: (state, action) => {
      state.category.push(action.payload);
    },
    removeCategorySuccess: (state, action) => {
      const data = current(state)
      state.category = data.category.filter(cate => cate.id !== action.payload)
    },
    editCategorySuccess: (state, action) => {
      const data = current(state)
      const newCate = action.payload;
      const cateIndex = data.category.findIndex(cate => cate.id === newCate.id);
      if (cateIndex >= 0) {
        state.category[cateIndex] = newCate;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addCategorySuccess, removeCategorySuccess, editCategorySuccess,setPageCateSuccess ,setLoadingDataSuccess} = slice.actions;

export const setDataCate = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addCategory = (data) => async (dispatch) => {
  try {
    dispatch(addCategorySuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removeCategory = (id) => async (dispatch) => {
  try {
    dispatch(removeCategorySuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editCategory = (data) => async (dispatch) => {
  try {
    dispatch(editCategorySuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageCate = (status) => async (dispatch) => {
  try {
    dispatch(setPageCateSuccess(status));
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