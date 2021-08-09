import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: "select",
    initialState: {
        dataSelect: {},
        loadingPage: true,
    },
    reducers: {
        setDataSelectSuccess: (state, action) => {
            state.dataSelect = action.payload;
        },
        setLoadingDataSuccess: (state, action) => {
            state.loadingPage = action.payload;
        },
    },
});
export default slice.reducer;

const { setDataSelectSuccess,setLoadingDataSuccess } = slice.actions;

export const setDataSelect = (data) => async (dispatch) => {
    try {
        dispatch(setDataSelectSuccess(data));
    } catch (e) {
        return console.error(e.message);
    }
};
export const setLoadingDataSelect = (status) => async (dispatch) => {
    try {
        dispatch(setLoadingDataSuccess(status));
    } catch (e) {
        return console.error(e.message);
    }
};