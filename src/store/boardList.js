import { CompressOutlined } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('boardList')
  ? JSON.parse(localStorage.getItem('boardList'))
  : [];

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

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    addNewItem: (state, action) => {
      let date = new Date().getTime();
      state.map((item, i) => {
        item.classChange = '';
      });
      state.unshift({
        idItem: action.payload,
        name: "Todo's name",
        date: date,
        description: "Todo's description",
        classChange: 'item--change item--new',
      });
    },
    removeItem: (state, action) => {
      let newId = action.payload.id;
      state.map((item, i) => {
        item.classChange = '';
      });
      if (action.payload.target === 'svg' || action.payload.target === 'path') {
        state.map((item, i) => {
          if (item.idItem === newId) {
            state.splice(i, 1);
          }
        });
      }
    },
    sortItemsUp: (state, action) => {
      state.sort((a, b) => a.date - b.date);
    },
    sortItemsDown: (state, action) => {
      state.sort((a, b) => b.date - a.date);
    },
    changeItem: (state, action) => {},
    saveItem: (state, action) => {
      let id = action.payload.id;
      let name = action.payload.name;
      let description = action.payload.description;
      let date = action.payload.date;
      let classChange = action.payload.classChange;
      state.map((item, i) => {
        if (item.idItem === id) {
          if (name) {
            item.name = name;
          }
          if (description) {
            item.description = description;
          }
          item.date = date;
          item.classChange = classChange;
        }
      });
    },
  },
});

export const borderSpace = (state) => state.board;

export const {
  addNewItem,
  removeItem,
  changeItem,
  saveItem,
  sortItemsUp,
  sortItemsDown,
} = boardSlice.actions;

export default boardSlice.reducer;
