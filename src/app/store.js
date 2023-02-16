import { configureStore } from '@reduxjs/toolkit';
import contactReducer from '../Redux/ContactsSlice';
import filterReducer from '../Redux/FilterSlice';

export const store = configureStore({
  reducer: {
    contacts: contactReducer,
    filters: filterReducer,
  },
});
