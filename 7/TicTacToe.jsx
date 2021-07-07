import React, { useState, useReducer, useCallback } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: '0',
  tableData: [
    ['','',''],
    ['','',''],
    ['','',''],
  ],
};

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const SET_TURN = 'SET_TURN';

const reducer = (state, action) => {  // action을 dispatch할 때 마다 실행된다.
  switch(action.type) {
    case SET_WINNER:
      // state.winner = action.winner // 이렇게 직접 바꾸면 안됨. 새로운 state를 만들어서 바뀌는 부분만 바꿔서 리턴
      return {
        ...state, 
        winner: action.winner,
      };
    case CLICK_CELL:
      const tableData = [...state.tableData]; // 얕은복사 
      tableData[action.row] = [...tableData[action.row]]; 
      tableData[action.row][action.cell] = status.turn;
      return{
        ...state,
        tableData,
      };
    case SET_TURN: 
      return {
        ...state,
        turn: state.turn === 'O' ? 'X' : 'O'
      }
  }
}

const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  // const [winner, setWinner ] = useState('');
  // const [turn, setTurn] = useState('0');
  // const [tableData, setTableData] = useState([['','',''],['','',''],['','','']]);

  const onClickTable = useCallback(() => {
    dispatch({ type: 'SET_WINNER', winner: '0' });
  }, []);

  return (
    <>
      <Table onClick = {onClickTable} tableData={state.tableData} dispatch={dispatch}/>
      {state.winner && <div> {state.winner}님의 승리</div>}
    </>
  )
};

export default TicTacToe;