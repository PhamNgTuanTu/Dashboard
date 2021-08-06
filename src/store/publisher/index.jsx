import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "publisher",
  initialState: {
    publisher: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.publisher = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPagePublissherSuccess: (state, action) => {
      state.page = action.payload;
    },
    addPublissherSuccess: (state, action) => {
      state.publisher.push(action.payload);
    },
    removePublissherSuccess: (state, action) => {
      const data = current(state)
      state.publisher = data.publisher.filter(publisher => publisher.id !== action.payload)
    },
    editPublissherSuccess: (state, action) => {
      const data = current(state)
      const newPublissher = action.payload;
      const publisherIndex = data.publisher.findIndex(publisher => publisher.id === newPublissher.id);
      if (publisherIndex >= 0) {
        state.publisher[publisherIndex] = newPublissher;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addPublissherSuccess, removePublissherSuccess, editPublissherSuccess,setPagePublissherSuccess,setLoadingDataSuccess } = slice.actions;

export const setDataPublissher = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addPublissher = (data) => async (dispatch) => {
  try {
    dispatch(addPublissherSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removePublissher = (id) => async (dispatch) => {
  try {
    dispatch(removePublissherSuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editPublissher = (data) => async (dispatch) => {
  try {
    dispatch(editPublissherSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPagePublissher = (status) => async (dispatch) => {
  try {
    dispatch(setPagePublissherSuccess(status));
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