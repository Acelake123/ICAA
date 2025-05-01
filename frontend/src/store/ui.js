import { createSlice } from "@reduxjs/toolkit";

const initialValue = {
  detectedType: '',
  showInfo: false,
  showDetail: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState: initialValue,
reducers : {
    detectedType(state, actions){
        state.detectedType = actions.payload;
    },
    showInfo(state){
        state.showInfo = !state.showInfo;
    },
    showTransactionDetail(state){
      state.showDetail = !state.showDetail;
  },

 
  },
});

export const searchAction = searchSlice.actions;

export default searchSlice.reducer;
