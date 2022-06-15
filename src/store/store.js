import { configureStore } from '@reduxjs/toolkit';
import boardList from './boardList';

export const store = configureStore({
  reducer: {
    board: boardList,
  },
});
