import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url, resturantId } from "../config";

// Async action to fetch menu data
export const gallery = createAsyncThunk(
  "imageGallery/gallery",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/GetGallery`,
        { resturantId: resturantId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GetGallerySlice = createSlice({
  name: "imageGallery",
  initialState: {
    imageGallery: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gallery.pending, (state) => {
        state.loading = true;
      })
      .addCase(gallery.fulfilled, (state, action) => {
        state.loading = false;
        state.imageGallery = action.payload?.data || [];
      })
      .addCase(gallery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default GetGallerySlice.reducer;
