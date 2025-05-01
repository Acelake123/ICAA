import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  signup: false,
  login: false,
};

const authSlice = createSlice({
  name: "Authentication",
  initialState: initialValue,
  reducers: {
    // Toggle actions
    signup(state) {
      state.signup = !state.signup;
    },
    login(state) {
      state.login = !state.login;
    },

    // Explicit set actions
    setSignup(state, action) {
      state.signup = action.payload;
    },
    setLogin(state, action) {
      state.login = action.payload;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
