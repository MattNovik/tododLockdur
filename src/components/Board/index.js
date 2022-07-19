import './index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Item } from '../Item'
import { addNewItem, sortItemsUp, sortItemsDown } from '../../store/boardList'
import { nanoid } from '@reduxjs/toolkit'
import { borderSpace } from '../../store/boardList'
import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { ReactComponent as IconAdd } from '../../img/icon-add.svg'

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
]

const weekDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const Board = () => {
  const dispatch = useDispatch()
  const boardList = useSelector(borderSpace)
  const [maxList, setMaxList] = useState(12)
  const [smallBoardList, setSmallBoardList] = useState(
    boardList.slice(0, maxList)
  )

  const todayDate =
    weekDay[new Date().getDay()] +
    ' ' +
    new Date().getDate() +
    ' ' +
    month[new Date().getMonth()]

  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)

  const filterByDate = (dates) => {
    const [start, end] = dates
    setStartDate(start)
    setEndDate(end)
    setSmallBoardList(boardList.slice(0, maxList))
    if (start !== null && end !== null) {
      setSmallBoardList(
        smallBoardList.filter(
          (item) => item.date >= start.getTime() && item.date <= end.getTime()
        )
      )
    }
  }

  const filterByReal = () => {}

  useEffect(() => {
    localStorage.setItem('boardList', JSON.stringify(boardList))
    setSmallBoardList(boardList.slice(0, maxList))
    console.log(boardList.slice(0, maxList))
    console.log(boardList)
    if (startDate !== null && endDate !== null) {
      setSmallBoardList(
        boardList
          .slice(0, maxList)
          .filter(
            (item) =>
              item.date >= startDate.getTime() && item.date <= endDate.getTime()
          )
      )
    }
  }, [boardList, maxList])

  return (
    <div
      className="board"
      onClick={(e) => {
        const listItem = document.querySelectorAll('.item')
        const wrapperButtonFilters = document.querySelector(
          '.wrapper-buttons-filters'
        )
        const wrapperButtonSorts = document.querySelector(
          '.wrapper-buttons-sorts'
        )
        const wrapperFilterDate = document.querySelector('.filter__by-date')
        if (
          !e.target.closest('.filter__by-date') &&
          wrapperFilterDate.classList.contains('filter__by-date--open') &&
          !e.target.classList.contains('filter__button-by-date')
        ) {
          wrapperFilterDate.classList.remove('filter__by-date--open')
        } // убираю окно фильтра даты при клике не на фильтр
        if (
          ((wrapperButtonSorts.classList.contains(
            'wrapper-buttons-sorts--open'
          ) ||
            wrapperButtonFilters.classList.contains(
              'wrapper-buttons-filters--open'
            )) &&
            !e.target.classList.contains('sorts') &&
            !e.target.classList.contains('filters')) ||
          (!e.target.closest('.sorts') && !e.target.closest('.filters'))
        ) {
          wrapperButtonSorts.classList.remove('wrapper-buttons-sorts--open')
          wrapperButtonFilters.classList.remove('wrapper-buttons-filters--open')
        } // убираю фокус с фильтра и сортировки

        if (!e.target.closest('li')) {
          if (
            (wrapperButtonSorts.classList.contains(
              'wrapper-buttons-sorts--open'
            ) ||
              wrapperButtonFilters.classList.contains(
                'wrapper-buttons-filters--open'
              )) &&
            !e.target.classList.contains('sorts') &&
            !e.target.classList.contains('filters')
          ) {
            wrapperButtonSorts.classList.remove('wrapper-buttons-sorts--open')
            wrapperButtonFilters.classList.remove(
              'wrapper-buttons-filters--open'
            )
          }
          Array.from(listItem).map((item) => {
            if (
              item.classList.contains('item--change') ||
              item.classList.contains('item--new')
            ) {
              item.classList.remove('item--change')
              item.classList.remove('item--new')
            }
          })
        } // убираю фокус с задачи
      }}
    >
      <div className="overlay-wrapper" onClick={() => {}}></div>
      <div className="board__head">
        <h1 className="board__title">Todo by @lockdur</h1>
        <div className="board__filter">
          <div className="wrapper-buttons-filters">
            <button
              className="button filters"
              onClick={() => {
                const wrapperButtonFilters = document.querySelector(
                  '.wrapper-buttons-filters'
                )
                const wrapperButtonSorts = document.querySelector(
                  '.wrapper-buttons-sorts'
                )

                wrapperButtonFilters.classList.toggle(
                  'wrapper-buttons-filters--open'
                )
                console.log('open filters')
                if (
                  wrapperButtonSorts.classList.contains(
                    'wrapper-buttons-sorts--open'
                  )
                ) {
                  wrapperButtonSorts.classList.remove(
                    'wrapper-buttons-sorts--open'
                  )
                }
              }}
            >
              filter
            </button>
            <button
              onClick={(e) => {
                const wrapperFilterDate =
                  document.querySelector('.filter__by-date')
                wrapperFilterDate.classList.toggle('filter__by-date--open')
              }}
              className="filter__button-by-date buttonFS"
            >
              date
            </button>
            <button
              onClick={() => console.log('byreal')}
              className="filter__button-by-real buttonFS"
            >
              {' '}
              real
            </button>
            <button
              onClick={() => {
                setStartDate(null)
                setEndDate(null)
                setSmallBoardList(boardList.slice(0, maxList))
              }}
              className="filter__button-by-usual buttonFS"
            >
              {' '}
              usual
            </button>
          </div>
          <div className="filter__by-date">
            <DatePicker
              selected={startDate}
              onChange={filterByDate}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
          </div>
        </div>
        <div className="board__sort">
          <div className="wrapper-buttons-sorts">
            <button
              className="button sorts"
              onClick={() => {
                const wrapperButtonSorts = document.querySelector(
                  '.wrapper-buttons-sorts'
                )
                const wrapperButtonFilters = document.querySelector(
                  '.wrapper-buttons-filters'
                )
                wrapperButtonSorts.classList.toggle(
                  'wrapper-buttons-sorts--open'
                )
                if (
                  wrapperButtonFilters.classList.contains(
                    'wrapper-buttons-filters--open'
                  )
                ) {
                  wrapperButtonFilters.classList.remove(
                    'wrapper-buttons-filters--open'
                  )
                }
              }}
            >
              sort
            </button>
            <button
              className="buttonFS sort__button-by-up"
              onClick={() => {
                dispatch(sortItemsUp())
              }}
            >
              date Up
            </button>
            <button
              className="buttonFS sort__button-by-down"
              onClick={() => {
                dispatch(sortItemsDown())
              }}
            >
              Date Down
            </button>
            <button
              className="buttonFS sort__button-by-usual"
              onClick={() => {
                setSmallBoardList(boardList.slice(0, maxList))
              }}
            >
              usual
            </button>
          </div>
          <div className="wrapper-sorts"></div>
        </div>
      </div>
      <div className="board__main">
        <div className="board__time">
          <span>Today is:</span>
          <span>{todayDate}</span>
        </div>
        <button
          className="board__button"
          onClick={() => {
            dispatch(addNewItem(nanoid()))
          }}
        >
          <IconAdd />
          {/*           <picture>
            <source type="image/webp" srcSet={iconAddWebp} />
            <img
              src={iconAddUs}
              srcSet={iconAdd2x}
              width="50"
              height="50"
              alt="icon-add"
            />
          </picture> */}
          <span> Add new task</span>
        </button>
        {smallBoardList.length !== 0 ? (
          <ul className="board__list">
            {smallBoardList.map((item, i) => {
              return (
                <Item
                  key={nanoid()}
                  idItem={item.idItem}
                  name={item.name}
                  description={item.description}
                  date={item.date}
                  classChange={item.classChange}
                />
              )
            })}
          </ul>
        ) : (
          <div className="board__list-empty">
            <p>Hi! You can add new task or goal at this page!</p>
          </div>
        )}
        {boardList.length > 12 && boardList.length !== smallBoardList.length ? (
          <button
            className="board__load-more"
            onClick={() => {
              const listItem = document.querySelectorAll('.item')
              Array.from(listItem).map((item) => {
                if (
                  item.classList.contains('item--change') ||
                  item.classList.contains('item--new')
                ) {
                  item.classList.remove('item--change')
                  item.classList.remove('item--new')
                }
              })
              setMaxList(maxList + 12)
              setSmallBoardList(boardList.slice(0, maxList))
            }}
          >
            Show more
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  )
}
