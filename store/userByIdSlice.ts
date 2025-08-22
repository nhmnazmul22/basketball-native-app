import { BASE_URL } from "@/config";
import { User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  isOk: boolean;
  data: User;
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    isOk: false,
    data: {} as User,
  },
  loading: false,
  error: null,
};

export const fetchUser = createAsyncThunk<Response>(
  "user/fetchUser",
  async () => {
    const response = await fetch(`${BASE_URL}/user-by-id`);
    const data = await response.json();

    return {
      isOk: response.ok,
      data: data.data || data,
    };
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default userSlice.reducer;
