import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url,resturantId } from "../config";

export const mainmenu = createAsyncThunk(
  "menumain/fetchMenumain",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/GetCategoryMenu`,
        { resturantId: resturantId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GetCategoryMenumainSlice = createSlice({
  name: "menumain",
  initialState: {
    itemCategorymenu: [],
    loading: false,
    error: null,
    dateTime:null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(mainmenu.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mainmenu.fulfilled, (state, action) => {
        state.loading = false;
        state.itemCategorymenu = action.payload?.data || [];
        state.dateTime = action.payload?.dateTime
      })
      .addCase(mainmenu.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});


export default GetCategoryMenumainSlice.reducer;
