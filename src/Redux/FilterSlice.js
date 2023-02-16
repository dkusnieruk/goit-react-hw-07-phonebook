import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filters: '',
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterValue(state, action) {
      state.filters = action.payload;
    },
  },
});

export const { setFilterValue } = filtersSlice.actions;
export const selectFilters = state => state.filters;

export default filtersSlice.reducer;
