import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url, resturantId } from "../config";

// Async action to fetch menu data
export const partner = createAsyncThunk(
  "deliveryPartner/partner",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${base_url}/api/GetDeliveryPartner`,
        { resturantId: resturantId },
        { headers: { "Content-Type": "application/json" } }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const GetDeliveryPartnerSlice = createSlice({
  name: "deliveryPartner",
  initialState: {
    deliveryPartner: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(partner.pending, (state) => {
        state.loading = true;
      })
      .addCase(partner.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryPartner = action.payload?.data || [];
      })
      .addCase(partner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong!";
      });
  },
});

export default GetDeliveryPartnerSlice.reducer;
