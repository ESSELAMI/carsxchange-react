import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
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
      const token = thunkAPI.getState().auth.user.user.access_token;
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
  async ({ id, carData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.user.access_token;
      return await carService.updateCar(id, carData, token);
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
// Thunk action to delete a car
export const deleteCar = createAsyncThunk(
  "/cars/delete",
  async (carId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.user.access_token;
      await carService.deleteCar(carId, token);
      return carId; // Return the deleted car ID
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
// Selector to filter user's cars
export const selectUserCars = createSelector(
  (state) => state.cars.cars,
  (_, userId) => userId,
  (cars, userId) => cars.filter((car) => car.user.user_id === userId)
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
        state.m = "Car added with success";
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

        state.message = "Car updated with success";
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
        state.message = "Cars loaded with success";
      })
      .addCase(getCars.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteCar.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = "";
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.message = "Car deleted with success";
        state.cars = state.cars.filter((car) => car.id !== action.payload);
      })
      .addCase(deleteCar.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMessage = action.payload;
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
