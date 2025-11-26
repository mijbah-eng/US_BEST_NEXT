import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url, resturantId } from "../config";

// Async action to fetch menu data
export const fetchMenu = createAsyncThunk(
  "menu/fetchMenu",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/GetMegaCategory`,
        { resturantId: resturantId },
        { headers: { "Content-Type": "application/json" } }
        );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GetcategorymenuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenu.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMenu.fulfilled, (state, action) => {
        state.loading = false;
        state.menuItems = action.payload?.data || [];
      })
      .addCase(fetchMenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default GetcategorymenuSlice.reducer;
