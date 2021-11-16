import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "home",
  initialState: {
    dataPie: [],
    dataSachBanChay: [],
    dataSachNhap: [],
    dataTotalUser: [],
    dataDonHangKho: [],
    dataDoanhThu : [],
    loading1: true,
    loading2: true,
    loading3: true,
    loading4: true,
    loading5: true,
    loading6: true,
  },
  reducers: {
    setDataPieSuccess: (state, action) => {
      state.dataPie = action.payload;
    },
    setDataSachBanChaySuccess: (state, action) => {
      state.dataSachBanChay = action.payload;
    },
    setDataSachNhapSuccess: (state, action) => {
      state.dataSachNhap = action.payload;
    },
    setDataTotalUserSuccess: (state, action) => {
      state.dataTotalUser = action.payload;
    },
    setDataDonHangKhoSuccess: (state, action) => {
      state.dataDonHangKho = action.payload;
    },
    setDataDoanhThuSuccess: (state, action) => {
      state.dataDoanhThu = action.payload;
    },
    setLoading1Success: (state, action) => {
      state.loading1 = action.payload;
    },
    setLoading2Success: (state, action) => {
      state.loading2 = action.payload;
    },
    setLoading3Success: (state, action) => {
      state.loading3 = action.payload;
    },
    setLoading4Success: (state, action) => {
      state.loading4 = action.payload;
    },
    setLoading5Success: (state, action) => {
      state.loading5 = action.payload;
    },
    setLoading6Success: (state, action) => {
      state.loading6 = action.payload;
    },
  },
});
export default slice.reducer;

const {
  setDataPieSuccess,
  setDataSachBanChaySuccess,
  setDataSachNhapSuccess,
  setDataTotalUserSuccess,
  setDataDonHangKhoSuccess,
  setDataDoanhThuSuccess,
  setLoading1Success,
  setLoading2Success,
  setLoading3Success,
  setLoading4Success,
  setLoading5Success,
  setLoading6Success
} = slice.actions;

export const setDataPie = (data) => async (dispatch) => {
  try {
    dispatch(setDataPieSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataSachBanChay = (data) => async (dispatch) => {
  try {
    dispatch(setDataSachBanChaySuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataSachNhap = (data) => async (dispatch) => {
  try {
    dispatch(setDataSachNhapSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataUserHome = (data) => async (dispatch) => {
  try {
    dispatch(setDataTotalUserSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataDonhangKho = (data) => async (dispatch) => {
  try {
    dispatch(setDataDonHangKhoSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setDataDoanhThu= (data) => async (dispatch) => {
  try {
    dispatch(setDataDoanhThuSuccess(data));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading1 = (status) => async (dispatch) => {
  try {
    dispatch(setLoading1Success(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading2 = (status) => async (dispatch) => {
  try {
    dispatch(setLoading2Success(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading3 = (status) => async (dispatch) => {
  try {
    dispatch(setLoading3Success(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading4 = (status) => async (dispatch) => {
  try {
    dispatch(setLoading4Success(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading5 = (status) => async (dispatch) => {
  try {
    dispatch(setLoading5Success(status));
  } catch (e) {
    return console.error(e.message);
  }
};

export const setLoading6 = (status) => async (dispatch) => {
  try {
    dispatch(setLoading6Success(status));
  } catch (e) {
    return console.error(e.message);
  }
};