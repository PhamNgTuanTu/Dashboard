import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "discount",
  initialState: {
    discount: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.discount = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageDisCountSuccess: (state, action) => {
      state.page = action.payload;
    },
    addDisCountSuccess: (state, action) => {
      state.discount.push(action.payload);
    },
    removeDisCountSuccess: (state, action) => {
      const data = current(state)
      state.discount = data.discount.filter(discount => discount.id !== action.payload)
    },
    editDisCountSuccess: (state, action) => {
      const data = current(state)
      const newDisCount = action.payload;
      const discountIndex = data.discount.findIndex(discount => discount.id === newDisCount.id);
      if (discountIndex >= 0) {
        state.discount[discountIndex] = newDisCount;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addDisCountSuccess, removeDisCountSuccess, editDisCountSuccess,setPageDisCountSuccess,setLoadingDataSuccess } = slice.actions;

export const setDataDisCount = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addDisCount = (data) => async (dispatch) => {
  try {
    dispatch(addDisCountSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removeDisCount = (id) => async (dispatch) => {
  try {
    dispatch(removeDisCountSuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editDisCount = (data) => async (dispatch) => {
  try {
    dispatch(editDisCountSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageDisCount = (status) => async (dispatch) => {
  try {
    dispatch(setPageDisCountSuccess(status));
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