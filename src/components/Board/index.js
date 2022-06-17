import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../Item';
import { addNewItem, saveItem } from '../../store/boardList';
import { nanoid } from '@reduxjs/toolkit';
import { borderSpace } from '../../store/boardList';
import { useEffect, useState } from 'react';

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

export const Board = () => {
  const dispatch = useDispatch();
  const boardList = useSelector(borderSpace);
  let MAXLIST = 9;
  const [smallBoardList, setSmallBoardList] = useState(
    boardList.slice(0, MAXLIST)
  );

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
        <div className="board__filter">filter by:</div>
        <div className="board__sort">sort by:</div>
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
            const newDate = new Date(item.date);
            const normalDate =
              newDate.getDate() +
              ' ' +
              month[newDate.getMonth()] +
              ' ' +
              newDate.getFullYear();
            return (
              <Item
                key={nanoid()}
                idItem={item.idItem}
                name={item.name}
                description={item.description}
                date={normalDate}
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
