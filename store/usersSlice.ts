import { BASE_URL } from "@/config";
import { User } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  isOk: boolean;
  data: User[];
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    isOk: false,
    data: [] as User[],
  },
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk<Response>(
  "user/fetchUsers",
  async () => {
    const response = await fetch(`${BASE_URL}/users`);
    const data = await response.json();
    return {
      isOk: response.ok,
      data: data.data,
    };
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchUsers.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default usersSlice.reducer;
