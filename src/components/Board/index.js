import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../Item';
import { addNewItem, sortItemsUp, sortItemsDown } from '../../store/boardList';
import { nanoid } from '@reduxjs/toolkit';
import { borderSpace } from '../../store/boardList';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

export const Board = () => {
  const dispatch = useDispatch();
  let boardList = useSelector(borderSpace);
  let MAXLIST = 9;
  const [smallBoardList, setSmallBoardList] = useState(
    boardList.slice(0, MAXLIST)
  );

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    setSmallBoardList(boardList.slice(0, MAXLIST));
    if (end !== null && start !== null) {
      setSmallBoardList(
        smallBoardList.filter(
          (item) => item.date >= start.getTime() && item.date <= end.getTime()
        )
      );
    }
  };

  useEffect(() => {
    localStorage.setItem('boardList', JSON.stringify(boardList));
    setSmallBoardList(boardList.slice(0, MAXLIST));
  }, [boardList]);

  return (
    <div
      className="board"
      onClick={(e) => {
        if (!e.target.closest('li')) {
          let listItem = document.querySelectorAll('.item');
          Array.from(listItem).map((item) => {
            if (item.classList.contains('item--change')) {
              item.classList.remove('item--change');
            }
          });
        }
      }}
    >
      <div className="overlay-wrapper" onClick={() => {}}></div>
      <div className="board__head">
        <h1 className="board__title">Todo by @lockdur</h1>
        <div className="board__filter">
          <span>filter by:</span>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        </div>
        <div className="board__sort">
          <span>sort by:</span>
          <button
            onClick={() => {
              dispatch(sortItemsUp());
            }}
          >
            by date Up
          </button>
          <button
            onClick={() => {
              dispatch(sortItemsDown());
            }}
          >
            by date Down
          </button>
        </div>
      </div>
      <div className="board__main">
        <button
          className="board__button"
          onClick={() => dispatch(addNewItem(nanoid()))}
        >
          {' '}
          Добавить новую задачу
        </button>
        <ul className="board__list">
          {smallBoardList.map((item, i) => {
            return (
              <Item
                key={nanoid()}
                idItem={item.idItem}
                name={item.name}
                description={item.description}
                date={item.date}
              />
            );
          })}
        </ul>
        {boardList.length > 9 && boardList.length !== smallBoardList.length ? (
          <button
            onClick={() => {
              MAXLIST += 9;
              setSmallBoardList(boardList.slice(0, MAXLIST));
            }}
          >
            Add more
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};
