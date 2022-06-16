import './index.scss';
import { TextareaAutosize, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeItem, changeItem, saveItem } from '../../store/boardList';
import DatePicker from 'react-datepicker';
import { useState } from 'react';

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

export const Item = ({ idItem, name, description, date }) => {
  const dispatch = useDispatch();
  const [picDate, setPicDate] = useState(new Date());

  return (
    <li
      className="item"
      id={idItem}
      onClick={(e) => {
        if (
          e.target.tagName !== 'BUTTON' &&
          e.target.tagName !== 'svg' &&
          e.target.tagName !== 'path'
        ) {
          let listItem = document.querySelectorAll('.item');
          Array.from(listItem).map((item) => {
            item.classList.remove('item--change');
          });
          e.target.closest('li').classList.add('item--change');
          //document.querySelector('.overlay-wrapper').classList.add('open');
          dispatch(changeItem());
        }
      }}
    >
      <Close
        className="item__close"
        onClick={(e) => {
          let data = {
            id: e.target.closest('li').id,
            target: e.target.tagName,
          };
          dispatch(removeItem(data));
        }}
      />
      <TextField
        label="Название цели"
        placeholder={name}
        className="item__name-input"
      />
      <h3 className="item__name">{name}</h3>
      <TextareaAutosize
        aria-label=""
        minRows={3}
        placeholder={description}
        className="item__description-input"
      />
      <p className="item__description">{description}</p>
      <div className="item__date-save">
        <span>{date}</span>
        <DatePicker
          selected={picDate}
          onChange={(date) => setPicDate(date)}
          className="item__date"
        />
        <button
          className="item__save-button"
          onClick={(e) => {
            let data = {
              id: e.target.closest('li').id,
              name: e.target.closest('li').querySelector('input').value,
              description: e.target
                .closest('li')
                .querySelector('.item__description-input').value,
              date:
                picDate.getDate() +
                ' ' +
                month[picDate.getMonth()] +
                ' ' +
                picDate.getFullYear(),
            };
            dispatch(saveItem(data));
            e.target.closest('li').classList.remove('item--change');
          }}
        >
          SAVE
        </button>
      </div>
    </li>
  );
};
