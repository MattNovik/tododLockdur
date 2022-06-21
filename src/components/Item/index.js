import './index.scss';
import { TextareaAutosize, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeItem, changeItem, saveItem } from '../../store/boardList';
import DatePicker from 'react-datepicker';
import { forwardRef, useState } from 'react';

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

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

export const Item = ({ idItem, name, description, date }) => {
  const dispatch = useDispatch();
  const dateObj = new Date(date);
  const coverDate =
    dateObj.getDate() +
    ' ' +
    month[dateObj.getMonth()] +
    ' ' +
    dateObj.getFullYear();
  const [pickerDate, setPickerDate] = useState(new Date(date));
  const [classDate] = useState(new Date().getTime() > date ? true : false);

  return (
    <li
      className="item"
      data-classdate={classDate}
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
        sx={{
          //padding: '5px',
          '& .MuiInputBase-input': {
            padding: '8px',
          },
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 8px) scale(1)',
          },
        }}
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
        <span className="item__date-visual">{coverDate}</span>
        <DatePicker
          selected={pickerDate}
          onChange={(date) => {
            setPickerDate(date.getTime());
          }}
          className="item__date"
          customInput={<CustomInput />}
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
              date: pickerDate,
            };
            dispatch(saveItem(data));
            e.target.closest('li').classList.remove('item--change');
          }}
        >
          ОК
        </button>
      </div>
    </li>
  );
};
