import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = 'https://63ee5e34d466e0c18baeba99.mockapi.io';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts',
  async () => {
    const response = await axios.get('/contacts');

    return response.data;
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContacts',
  async ({ name, phone }, thunkAPI) => {
    try {
      const response = await axios.post('/contacts', { name, phone });
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  'contacts/deleteContact',
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${id}`);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [addContact.pending]: (state, action) => {
      state.isLoading = true;
    },
    [addContact.fulfilled]: (state, action) => {
      state.items.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    [deleteContact.pending]: (state, action) => {
      state.isLoading = true;
    },
    [deleteContact.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        contacts => contacts.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const selectContacts = state => state.contacts.items;
export const selectArray = state => state.contacts;
export default contactsSlice.reducer;
