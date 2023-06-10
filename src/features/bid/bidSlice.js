import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import bidService from "../services/bidService";
const initialState = {
  bids: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get bids
export const getBids = createAsyncThunk(
  "/bids/getMyBids",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.user.access_token;

      return await bidService.getBids(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Create new bid
export const createBid = createAsyncThunk(
  "/cars/create",
  async ({ carId, price }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.user.access_token;
      return await bidService.createBid(carId, price, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(error);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const bidSlice = createSlice({
  name: "bid",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBid.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bids.push(action.payload);
        state.message = "Bid added with success";
      })
      .addCase(createBid.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      .addCase(getBids.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBids.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bids = action.payload;
        state.message = "Bids loaded with success";
      })
      .addCase(getBids.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = bidSlice.actions;
export default bidSlice.reducer;
