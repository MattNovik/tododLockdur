import './index.scss';
import { TextareaAutosize, TextField } from '@mui/material';
import { Close } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { removeItem, changeItem, saveItem } from '../../store/boardList';
import DatePicker from 'react-datepicker';
import { forwardRef, useState } from 'react';

const month = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

const CustomInput = forwardRef(({ value, onClick }, ref) => (
  <button className="custom-input" onClick={onClick} ref={ref}>
    {value}
  </button>
));

export const Item = ({ idItem, name, description, date, classChange }) => {
  const dispatch = useDispatch();
  const dateObj = new Date(date);
  const coverDate =
    dateObj.getDate() +
    ' ' +
    month[dateObj.getMonth()] +
    ', ' +
    dateObj.getFullYear();
  const [pickerDate, setPickerDate] = useState(new Date(date).getTime());
  const [classDate] = useState(new Date().getTime() > date ? true : false);

  return (
    <li
      className={classChange ? 'item ' + classChange : 'item'}
      data-classdate={classDate}
      data-datetime={pickerDate}
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
            item.classList.remove('item--new');
          });
          e.target.closest('li').classList.add('item--change');
          e.target.closest('li').querySelector('input').value = name;
          e.target
            .closest('li')
            .querySelector('.item__description-input').value = description;
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
        //label="Enter your goal"
        placeholder={name}
        className="item__name-input"
        onChange={(e) => {
          name = e.target.value;
        }}
        sx={{
          '& .MuiInputBase-input': {
            padding: '8px',
          },
          '& .MuiOutlinedInput-root:hover fieldset': {
            borderColor: '#1976d2',
          },
          '& .MuiOutlinedInput-root fieldset': {
            borderWidth: '2px',
            transition: 'border-color .3s ease',
          },
          '& .MuiInputLabel-root': {
            transform: 'translate(14px, 8px) scale(1)',
          },
          '& label.Mui-focused': {
            display: 'none',
          },
          '& .Mui-focused legend': {
            display: 'none',
          },
          '& .Mui-focused fieldset': {
            top: '0',
          },
        }}
      />
      <h3 className="item__name">{name}</h3>
      <TextareaAutosize
        aria-label=""
        minRows={3}
        onChange={(e) => {
          description = e.target.value;
        }}
        placeholder={description}
        className="item__description-input"
      />
      <p className="item__description">{description}</p>
      <div className="item__date-save">
        <span className="item__date-visual">{coverDate}</span>
        <DatePicker
          selected={pickerDate}
          //showTimeSelect
          onChange={(date) => {
            setPickerDate(date.getTime());
          }}
          className="item__date"
          customInput={<CustomInput />}
          dateFormat="d MMM, yyyy"
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
              classChange: '',
            };
            dispatch(saveItem(data));
            e.target.closest('li').classList.remove('item--change');
            e.target.closest('li').classList.remove('item-new');
          }}
        >
          ОК
        </button>
      </div>
    </li>
  );
};
