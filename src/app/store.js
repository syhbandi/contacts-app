import { configureStore } from "@reduxjs/toolkit";
import contactsReducer from "../features/contactsSlice";
import authReducer from "../features/authSlice";

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    auth: authReducer,
  },
});
