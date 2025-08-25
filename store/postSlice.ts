import { BASE_URL } from "@/config";
import { Post } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  isOk: boolean;
  data: Post[];
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    isOk: false,
    data: [] as Post[],
  },
  loading: false,
  error: null,
};

export const fetchPost = createAsyncThunk<Response>(
  "post/fetchPost",
  async () => {
    const response = await fetch(`${BASE_URL}/posts`);
    const data = await response.json();
    return {
      isOk: response.ok,
      data: data.data,
    };
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchPost.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default postSlice.reducer;
