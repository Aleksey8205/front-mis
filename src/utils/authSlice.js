import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  authenticated: false,
  errorMessage: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    checkAuthSuccess(state, action) {
      state.user = action.payload;
      state.authenticated = true;
    },
    loginSuccess(state, action) {
      state.user = action.payload;
      state.authenticated = true;
    },
    loginError(state, action) {
      state.errorMessage = action.payload;
      state.authenticated = false;
    },
    logout(state) {
      state.user = null;
      state.authenticated = false;
      state.errorMessage = null;
    },
  },
});

export const { checkAuthSuccess, loginSuccess, loginError, logout } = authSlice.actions;
export default authSlice.reducer;