import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "select",
    initialState: {
        dataSelect: {},
        loadingPage: true,
        errorPageHeight: false,
        errorPageWidth: false,
        errorPageHeightMes: '',
        errorPageWidthMes: '',
    },
    reducers: {
        setDataSelectSuccess: (state, action) => {
            state.dataSelect = action.payload;
        },
        setLoadingDataSuccess: (state, action) => {
            state.loadingPage = action.payload;
        },
        setErrorDataSuccess: (state, action) => {
            state.errorPageHeight = action.payload;
        },
    },
});
export default slice.reducer;

const { setDataSelectSuccess,setLoadingDataSuccess,setErrorDataSuccess } = slice.actions;

export const setDataSelect = (data) => async (dispatch) => {
    try {
        dispatch(setDataSelectSuccess(data));
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
export const setErrorHeight = (status) => async (dispatch) => {
    try {
        dispatch(setErrorDataSuccess(status));
    } catch (e) {
        return console.error(e.message);
    }
};