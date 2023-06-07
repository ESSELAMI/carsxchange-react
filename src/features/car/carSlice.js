import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import carService from "../services/carService";
import apiClient from "../../app/apiClient";
const initialState = {
  cars: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Get cars
export const getCars = createAsyncThunk("/cars/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.user.access_token;

    return await carService.getCars(token);
    // // return await carService.getCars(token);
    // // console.log(response.data); // Check the response in the console
    // return response.data;
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create new car
export const createCar = createAsyncThunk(
  "/cars/create",
  async (carData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.createCar(carData, token);
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

//Update car
export const updateCar = createAsyncThunk(
  "/cars/update",
  async (carData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await carService.updateCar(carData, token);
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

export const carSlice = createSlice({
  name: "car",
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
      .addCase(createCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars.push(action.payload);
      })
      .addCase(createCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCar.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Find the updated car index in the cars array
        const updatedCarIndex = state.cars.findIndex(
          (car) => car.id === action.payload.id
        );
        if (updatedCarIndex !== -1) {
          // Update the car object in the cars array
          state.cars[updatedCarIndex] = action.payload;
        }
      })
      .addCase(updateCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getCars.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.cars = action.payload;
        console.log("fwf", action.payload);
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
    //   .addCase(deleteCar.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(deleteCar.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.cars = state.cars.filter((car) => car._id !== action.payload.id);
    //   })
    //   .addCase(deleteCar.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.message = action.payload;
    //   });
  },
});

export const { reset } = carSlice.actions;
export default carSlice.reducer;
