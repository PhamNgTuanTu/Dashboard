import { createSlice, current } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    listUser: [],
    page : 10,
    loadingPage : true,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logoutSuccess: (state, action) => {
      state.user = null;
      localStorage.removeItem("user");
    },
    setDataSuccess: (state, action) => {
      state.listUser = action.payload;
    },
    setLoadingDataSuccess: (state, action) => {
      state.loadingPage = action.payload;
    },
    setPageUserSuccess: (state, action) => {
      state.page = action.payload;
    },
    setStatusSuccess: (state, action) => {
      const { id, status } = action.payload
      const data = current(state)
      const userIndex = data.listUser.findIndex(user => user.id === id);
      if (userIndex >= 0) {
        let newStatus = [
          {
            ...data.listUser[userIndex],
            status: status
          },
        ];
        state.listUser[userIndex] = newStatus[0];
      }
    }
  },
});
export default slice.reducer;
const { loginSuccess, logoutSuccess, setDataSuccess, setStatusSuccess,setPageUserSuccess,setLoadingDataSuccess } = slice.actions;

export const login = ({ name, token }) => async (dispatch) => {
  try {
    dispatch(loginSuccess({ name, token }));
  } catch (e) {
    return console.error(e.message);
  }
};
export const logout = () => async (dispatch) => {
  try {
    return dispatch(logoutSuccess());
  } catch (e) {
    return console.error(e.message);
  }
};
export const setDataUser = (data) => async (dispatch) => {
  try {
    return dispatch(setDataSuccess(data));
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
export const setPageUser = (status) => async (dispatch) => {
  try {
    dispatch(setPageUserSuccess(status));
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