import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Book {
  key: string;
  title: string;
  author_name: string[];
  cover_i?: number;
  cover_img: string;
  liked?: boolean;
}

interface BooksState {
  books: Book[];
}

const initialState: BooksState = {
  books: [],
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    setBooks(state, action: PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    toggleLike(state, action: PayloadAction<string>) {
      const book = state.books.find((book) => book.key === action.payload);
      if (book) {
        book.liked = !book.liked;
      }
    },
    removeBook(state, action: PayloadAction<string>) {
      state.books = state.books.filter((book) => book.key !== action.payload);
    },
  },
});

export const { setBooks, toggleLike, removeBook } = booksSlice.actions;
export default booksSlice.reducer;
