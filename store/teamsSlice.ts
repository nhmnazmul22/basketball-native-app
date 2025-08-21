import { BASE_URL } from "@/config";
import { Team } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  isOk: boolean;
  data: Team[];
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    isOk: false,
    data: [] as Team[],
  },
  loading: false,
  error: null,
};

export const fetchTeams = createAsyncThunk<Response>(
  "team/fetchTeams",
  async () => {
    const response = await fetch(`${BASE_URL}/teams`);
    const data = await response.json();
    return {
      isOk: response.ok,
      data: data.data,
    };
  }
);

const teamsSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchTeams.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchTeams.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default teamsSlice.reducer;
