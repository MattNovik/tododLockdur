import './index.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Item } from '../Item';
import { addNewItem } from '../../store/boardList';
import { nanoid } from '@reduxjs/toolkit';
import { borderSpace } from '../../store/boardList';
import { useEffect, useState } from 'react';

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
    <div className="board" onClick={() => {}}>
      <div className="board__head">
        <h1 className="board__title">Todo by @lockdur</h1>
      </div>
      <div className="board__main">
        <button
          className="board__button"
          onClick={() => dispatch(addNewItem(nanoid()))}
        >
          {' '}
          Add new item
        </button>
        <ul className="board__list">
          {smallBoardList.map((item) => {
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
