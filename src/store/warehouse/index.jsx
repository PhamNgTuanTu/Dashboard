import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "warehouse",
  initialState: {
    warehouse: [],
    page: 10,
    loadingPage: true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.warehouse = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageWareSuccess: (state, action) => {
      state.page = action.payload;
    },
    addWareHouseSuccess: (state, action) => {
      state.warehouse.push(action.payload);
    },
    setStatusSuccess: (state, action) => {
      const { id, status } = action.payload;
      const data = current(state);
      const wareIndex = data.warehouse.findIndex((ware) => ware.id === id);
      if (wareIndex >= 0) {
        let newStatus = [
          {
            ...data.warehouse[wareIndex],
            status: status,
          },
        ];
        state.warehouse[wareIndex] = newStatus[0];
      }
    },
  },
});
export default slice.reducer;

const {
  setDataSuccess,
  addWareHouseSuccess,
  setPageWareSuccess,
  setLoadingDataSuccess,
  setStatusSuccess,
} = slice.actions;

export const setDataWare = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addWareHouse = (data) => async (dispatch) => {
  try {
    dispatch(addWareHouseSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setPageWare = (status) => async (dispatch) => {
  try {
    dispatch(setPageWareSuccess(status));
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
export const setStatus = (status, id) => async (dispatch) => {
  try {
    dispatch(setStatusSuccess({ status, id }));
  } catch (e) {
    return console.error(e.message);
  }
};
