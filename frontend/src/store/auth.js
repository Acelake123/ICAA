import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  signup: false,
  login: false,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialValue,
reducers : {
    signup(state) {
      state.signup = !state.signup;
    },
    showLogin(state) {
      state.login = !state.login;
    },
  },
});

export const authAction = authSlice.actions;

export default authSlice.reducer;
