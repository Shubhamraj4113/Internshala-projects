import { createSlice } from "@reduxjs/toolkit";
import booksData from "../data/books";

const booksSlice = createSlice({
  name: "books",
  initialState: booksData,

  reducers: {
    addBook: (state, action) => {
      state.unshift(action.payload);
    }
  }
});

export const { addBook } = booksSlice.actions;
export default booksSlice.reducer;