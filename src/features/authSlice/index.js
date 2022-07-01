import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI, { cekLogin as recek } from "./authAPI";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  status: "",
  message: "",
};

export const login = createAsyncThunk("auth/login", async (data, thunkAPI) => {
  try {
    return await authAPI.login(data);
  } catch (error) {
    return thunkAPI.rejectWithValue("Email atau password salah");
  }
});

export const logout = createAsyncThunk(
  "auth/logout",
  async (data, thunkAPI) => {
    try {
      return await authAPI.logout();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      return await authAPI.register(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state, action) => {
      state.status = "";
      state.message = "";
    },
    reLogin: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    // login
    builder
      .addCase(login.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "";
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
    // register
    builder
      .addCase(register.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
    // logout
    builder
      .addCase(logout.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.message = "";
        state.user = null;
        localStorage.removeItem("user");
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "rejected";
        state.message = action.payload;
      });
  },
});

export const { reset, reLogin } = authSlice.actions;
export default authSlice.reducer;
