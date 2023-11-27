
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  filterName: string;
  filterYear: string;
  filterOpener: string;
}

const initialState: FilterState = {
  filterName: '',
  filterYear: '',
  filterOpener: '',
};

const filterObjSlice = createSlice({
  name: 'filterObj',
  initialState,
  reducers: {
    setFilterName(state, action: PayloadAction<string>) {
      state.filterName = action.payload;
    },
    setFilterYear(state, action: PayloadAction<string>) {
      state.filterYear = action.payload;
    },
    setFilterOpener(state, action: PayloadAction<string>) {
      state.filterOpener = action.payload;
    },
    resetFilters(state) {
      state.filterName = '';
      state.filterYear = '';
      state.filterOpener = '';
    },
  },
});

export const { setFilterName, setFilterYear, setFilterOpener, resetFilters } = filterObjSlice.actions;

export default filterObjSlice.reducer;
