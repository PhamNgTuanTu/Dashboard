import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "slider",
  initialState: {
    sliders: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    setDataSuccess: (state, action) => {
      state.sliders = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageSliderSuccess: (state, action) => {
      state.page = action.payload;
    },
    addSliderSuccess: (state, action) => {
      state.sliders.push(action.payload);
    },
    removeSliderSuccess: (state, action) => {
      const data = current(state)
      state.sliders = data.sliders.filter(slider => slider.id !== action.payload)
    },
    editSliderSuccess: (state, action) => {
      const data = current(state)
      const newSliders = action.payload;
      const slidersIndex = data.sliders.findIndex(slider => slider.id === newSliders.id);
      if (slidersIndex >= 0) {
        state.sliders[slidersIndex] = newSliders;
      }
    },
  },
});
export default slice.reducer;

const { setDataSuccess, addSliderSuccess, removeSliderSuccess, editSliderSuccess,setPageSliderSuccess,setLoadingDataSuccess } = slice.actions;

export const setDataSlider = (data) => async (dispatch) => {
  try {
    dispatch(setDataSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const addSliderNha = (data) => async (dispatch) => {
  try {
    dispatch(addSliderSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const removeSliderNha = (id) => async (dispatch) => {
  try {
    dispatch(removeSliderSuccess(id));
  } catch (e) {
    return console.error(e.message);
  }
};
export const editSliderNha = (data) => async (dispatch) => {
  try {
    dispatch(editSliderSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};
export const setPageSlider = (status) => async (dispatch) => {
  try {
    dispatch(setPageSliderSuccess(status));
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