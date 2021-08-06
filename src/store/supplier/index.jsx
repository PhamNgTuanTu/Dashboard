import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "supplier",
  initialState: {
    suppliers: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.suppliers = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageSuppliersSuccess: (state, action) => {
      state.page = action.payload;
    },
    addSuppliersSuccess: (state, action) => {
      state.suppliers.push(action.payload);
    },
    removeSuppliersSuccess: (state, action) => {
      const data = current(state)
      state.suppliers = data.suppliers.filter(supplier => supplier.id !== action.payload)
    },
    editSuppliersSuccess: (state, action) => {
      const data = current(state)
      const newSupplier = action.payload;
      const suppliersIndex = data.suppliers.findIndex(supplier => supplier.id === newSupplier.id);
      if (suppliersIndex >= 0) {
        state.suppliers[suppliersIndex] = newSupplier;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addSuppliersSuccess, removeSuppliersSuccess, editSuppliersSuccess,setPageSuppliersSuccess,setLoadingDataSuccess } = slice.actions;

export const setDataSuppliers = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addSuppliers = (data) => async (dispatch) => {
  try {
    dispatch(addSuppliersSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removeSuppliers = (id) => async (dispatch) => {
  try {
    dispatch(removeSuppliersSuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editSuppliers = (data) => async (dispatch) => {
  try {
    dispatch(editSuppliersSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageSuppliers = (status) => async (dispatch) => {
  try {
    dispatch(setPageSuppliersSuccess(status));
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