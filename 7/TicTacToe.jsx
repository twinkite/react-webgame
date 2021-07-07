import React, { useState, useReducer, useCallback, useEffect, memo } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],
  recentCell: [-1, -1], // 최근에 클릭한 셀 기억
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';
export const RESET_GAME = 'RESET_GAME';

const reducer = (state, action) => {  // action을 dispatch할 때 마다 실행된다.
  switch(action.type) {
    case SET_WINNER:{
      // state.winner = action.winner // 이렇게 직접 바꾸면 안됨. 새로운 state를 만들어서 바뀌는 부분만 바꿔서 리턴
      return {
        ...state, 
        winner: action.winner,
      };
    }
    case CLICK_CELL:{
      const tableData = [...state.tableData]; // 얕은복사 
      tableData[action.row] = [...tableData[action.row]]; 
      tableData[action.row][action.cell] = state.turn;
      return{
        ...state,
        tableData,
        recentCell: [action.row, action.cell],
      };
    }
    case SET_TURN:{ 
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O',
      };
    }
    case RESET_GAME: {
      return {
        ...state,
        turn: 'O',
        tableData: [
          ['','',''],
          ['','',''],
          ['','',''],
        ],
        recentCell: [-1, -1],
      };
    }
    default:
      return state;
  }
}

const TicTacToe = memo(() => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, turn, winner, recentCell } = state;
  // const [winner, setWinner ] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: 'O' });
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0) return;
    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if(win) {
      dispatch({type: SET_WINNER, winner: turn});
      dispatch({ type: RESET_GAME });
    } else {
      // 무승부 검사
      let all = true; 
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if(!cell){
            all = true;
          }
        });
      });
      if(!all){
        dispatch({ type: RESET_GAME });
      } else {
        dispatch({ type: SET_TURN });
      }
    }
  }, [recentCell]);

  return (
    <>
      <Table onClick = {onClickTable} tableData={tableData} dispatch={dispatch}/>
      {winner && <div> {winner}님의 승리</div>}
    </>
  )
});

export default TicTacToe;