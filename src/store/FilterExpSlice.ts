import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpeditionFilterState {
  Status: string;
  fromDate: string;
  toDate: string;

}

const initialState: ExpeditionFilterState = {
  Status: '',
  fromDate: '',
  toDate: '',
};

const expeditionFilterSlice = createSlice({
  name: 'expeditionFilter',
  initialState,
  reducers: {
    setFilterStatus(state, action: PayloadAction<string>) {
      state.Status = action.payload;
    },
    setFromDate(state, action: PayloadAction<string>) {
      state.fromDate = action.payload;
    },
    setToDate(state, action: PayloadAction<string>) {
      state.toDate = action.payload;
    },
  },
});

export const {setFilterStatus, setFromDate, setToDate} = expeditionFilterSlice.actions;

export default expeditionFilterSlice.reducer;
