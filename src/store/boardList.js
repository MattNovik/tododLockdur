import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('boardList')
  ? JSON.parse(localStorage.getItem('boardList'))
  : [];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      let date = new Date().getTime();
      state.unshift({
        idItem: action.payload,
        name: 'Введите название цели',
        date: date,
        description: 'Введите описание цели',
      });
    },
    removeItem: (state, action) => {
      let newId = action.payload.id;
      if (action.payload.target === 'svg' || action.payload.target === 'path') {
        state.map((item, i) => {
          if (item.idItem === newId) {
            state.splice(i, 1);
          }
        });
      }
    },
    changeItem: (state, action) => {},
    saveItem: (state, action) => {
      let id = action.payload.id;
      let name = action.payload.name;
      let description = action.payload.description;
      let date = new Date(action.payload.date).getTime();
      state.map((item, i) => {
        if (item.idItem === id) {
          if (name) {
            item.name = name;
          }
          if (description) {
            item.description = description;
          }
          item.date = date;
        }
      });
    },
  },
});

export const borderSpace = (state) => state.board;

export const { addNewItem, removeItem, changeItem, saveItem } =
  boardSlice.actions;

export default boardSlice.reducer;
