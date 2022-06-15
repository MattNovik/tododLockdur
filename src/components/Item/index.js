import './index.scss';
import React from 'react';
import { TextareaAutosize, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeItem, changeItem, saveItem } from '../../store/boardList';

export const Item = ({ idItem, name, description, date }) => {
  const dispatch = useDispatch();

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
          e.target.closest('li').classList.add('item--change');
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
      <div className="item__date">{date}</div>
      <button
        className="item__save-button"
        onClick={(e) => {
          let data = {
            id: e.target.closest('li').id,
            name: e.target.closest('li').querySelector('input').value,
            description: e.target
              .closest('li')
              .querySelector('.item__description-input').value,
          };
          dispatch(saveItem(data));
          e.target.closest('li').classList.remove('item--change');
        }}
      >
        SAVE
      </button>
    </li>
  );
};
