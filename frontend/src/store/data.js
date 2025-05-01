import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  tnxData: [],
  currentWalletID: null,
  graphData: [],
  loadW: null
};

const DataSlice = createSlice({
  name: "tnxData",
  initialState: initialValue,
reducers : {
    loadData(state, actions) {
      state.tnxData = actions.payload;
    },
    loadCurrentWalletId(state, actions) {
      state.currentWalletID = actions.payload;
    },
    loadWalletId(state, actions) {
      state.loadW = actions.payload;
    },
  },
});

export const DataAction = DataSlice.actions;

export default DataSlice.reducer;
