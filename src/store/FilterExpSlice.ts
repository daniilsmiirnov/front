import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ExpeditionFilterState {
//   Name: string;
  Status: string;
  fromDate: string;
  toDate: string;
  selectedUser: string;

}

const initialState: ExpeditionFilterState = {
// Name: '',
  Status: '',
  fromDate: '',
  toDate: '',
  selectedUser: '',
};

const expeditionFilterSlice = createSlice({
  name: 'expeditionFilter',
  initialState,
  reducers: {
    // setFilterName(state, action: PayloadAction<string>) {
    //     state.Name = action.payload;
    //   },
    setFilterStatus(state, action: PayloadAction<string>) {
      state.Status = action.payload;
    },
    setFromDate(state, action: PayloadAction<string>) {
      state.fromDate = action.payload;
    },
    setToDate(state, action: PayloadAction<string>) {
      state.toDate = action.payload;
    },
    setFilterUser: (state, action: PayloadAction<string>) => {
      state.selectedUser = action.payload;
    },
    clearExpeditionFilter(state) {
        // state.Name = '';
        state.Status = '';
        state.fromDate = '';
        state.toDate = '';
        state.selectedUser = '';
      },
  },
});

export const {setFilterUser, setFilterStatus, setFromDate, setToDate,clearExpeditionFilter} = expeditionFilterSlice.actions;

export default expeditionFilterSlice.reducer;
