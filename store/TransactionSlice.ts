import { BASE_URL } from "@/config";
import { Transaction } from "@/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Response {
  isOk: boolean;
  data: Transaction[];
}

interface InitialState {
  items?: Response;
  loading: boolean;
  error: string | null;
}

const initialState: InitialState = {
  items: {
    isOk: false,
    data: [] as Transaction[],
  },
  loading: false,
  error: null,
};

export const fetchTransactions = createAsyncThunk<Response>(
  "transaction/fetchTransactions",
  async () => {
    const response = await fetch(`${BASE_URL}/transactions`);
    const data = await response.json();
    return {
      isOk: response.ok,
      data: data.data,
    };
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state, action) => {
        state.loading = true;
        state.error = null;
        state.items = initialState.items;
      })
      .addCase(
        fetchTransactions.fulfilled,
        (state, action: PayloadAction<Response>) => {
          state.loading = false;
          state.items = action.payload;
        }
      )
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        // console.log("action", action);
        state.error = action.error.message ?? "Something went wrong";
        state.items = initialState.items;
      });
  },
});

export default transactionSlice.reducer;
