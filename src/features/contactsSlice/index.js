import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import contactAPI from "./contactAPI";

const initialState = {
  contacts: [],
  status: "",
  message: "",
};

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (data, thunkAPI) => {
    try {
      return await contactAPI.addContact(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getContacts = createAsyncThunk(
  "contacts/getContacts",
  async (data, thunkAPI) => {
    try {
      const uid = thunkAPI.getState().auth.user.uid;
      return await contactAPI.getContacts(uid);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      return await contactAPI.deleteContact(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // ambil data kontak dari firebase
    builder
      .addCase(getContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
        state.status = "";
        state.message = "";
      })
      .addCase(getContacts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getContacts.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
    // tambah satu kontak
    builder
      .addCase(addContact.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.status = "";
        state.message = "";
      })

      .addCase(addContact.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
    // hapus data kontak
    builder
      .addCase(deleteContact.pending, (state) => {
        state.status = "pending";
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          (contact) => contact.id !== action.payload
        );
        state.status = "";
        state.message = "";
      })

      .addCase(deleteContact.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
  },
});

// export const { setUsers } = contactsSlice.actions;
export default contactsSlice.reducer;
