import { createSlice } from '@reduxjs/toolkit';

const month = [
  'янв',
  'фев',
  'мар',
  'апр',
  'май',
  'июн',
  'июл',
  'авг',
  'сен',
  'окт',
  'ноя',
  'дек',
];

const initialState = localStorage.getItem('boardList')
  ? JSON.parse(localStorage.getItem('boardList'))
  : [];

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      let date = new Date();
      let result =
        date.getDate() +
        ' ' +
        month[date.getMonth()] +
        ' ' +
        date.getFullYear();
      state.unshift({
        idItem: action.payload,
        name: 'some name',
        date: result,
        description: 'some info',
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
      state.map((item, i) => {
        if (item.idItem === id) {
          if (name) {
            item.name = name;
          }
          if (description) {
            item.description = description;
          }
        }
      });
    },
  },
});

export const borderSpace = (state) => state.board;

export const { addNewItem, removeItem, changeItem, saveItem } =
  boardSlice.actions;

export default boardSlice.reducer;
