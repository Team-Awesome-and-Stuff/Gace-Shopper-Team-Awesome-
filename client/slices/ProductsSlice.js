import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const fetchProducts = createAsyncThunk("Products/fetch", async () => {
  try {
    const { data } = await axios.get("/api/products");
    return data;
  } catch (err) {
    console.log(err);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: [],
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state = action.payload;
      return state;
    });
  },
});

export default productsSlice.reducer;
