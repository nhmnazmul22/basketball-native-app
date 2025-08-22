import { BASE_URL } from "@/config";
import { DashboardSummary } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  isOk: boolean;
  data: DashboardSummary;
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    isOk: false,
    data: {} as DashboardSummary,
  },
  loading: false,
  error: null,
};

export const fetchDashboardSummary = createAsyncThunk<Response>(
  "report/fetchDashboardSummary",
  async () => {
    const response = await fetch(`${BASE_URL}/dashboard-report`);
    const data = await response.json();
    return {
      isOk: response.ok,
      data: data.data,
    };
  }
);

const dashboardSummarySlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchDashboardSummary.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false;
        // console.log("action", action);
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default dashboardSummarySlice.reducer;
