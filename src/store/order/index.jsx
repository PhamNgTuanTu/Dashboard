import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "orders",
  initialState: {
    order: [],
    page: 10,
    loadingPage: true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.order = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageOderSuccess: (state, action) => {
      state.order = action.payload;
    },
    setStatusSuccess: (state, action) => {
      const { id, status } = action.payload;
      const data = current(state);
      const orderIndex = data.order.findIndex((ord) => ord.id === id);
      if (orderIndex >= 0) {
        let newStatus = [
          {
            ...data.order[orderIndex],
            status: status,
          },
        ];
        state.order[orderIndex] = newStatus[0];
      }
    },
  },
});
export default slice.reducer;

const {
  setDataSuccess,
  setPageOderSuccess,
  setLoadingDataSuccess,
  setStatusSuccess,
} = slice.actions;

export const setDataOder = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageOder = (status) => async (dispatch) => {
  try {
    dispatch(setPageOderSuccess(status));
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
export const setStatusOder = (status, id) => async (dispatch) => {
  try {
    dispatch(setStatusSuccess({ status, id }));
  } catch (e) {
    return console.error(e.message);
  }
};
