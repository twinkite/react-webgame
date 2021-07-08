import React, { useEffect, useReducer, createContext, useMemo } from 'react';
import Table from './Table';
import Form from './Form';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0, // 0 이상이면 opened
};

export const TableContext = createContext({
  tableData: [], 
  halted: true,
  dispatch: () => {},
});

const initialState = {
  tableData: [],
  timer: '0',
  result: '',
  halted: true,
}

const plantMine = (row, col, mine) => {
  console.log(row, col, mine);
  const candidate = Array(row * col).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * col - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }

  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < col; j++) {
      rowData.push(CODE.NORMAL);
    }
  }

  for (let k = 0; k < shuffle.length; k++) {
    const ver = Math.floor(shuffle[k] / col);
    const hor = shuffle[k] % col;
    data[ver][hor] = CODE.MINE;
  }

  console.log(data);
  return data;
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';

const reducer = (state, action) => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.col, action.mine),
        halted: false,
      };
    case OPEN_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.OPENED;
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.col] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.MINE){
        tableData[action.row][action.col] = CODE.FLAG_MINE;
      } else {
        tableData[action.row][action.col] = CODE.FLAG;
      }
      return {
        ...state,
        tableData,
      }
    }
    case QUESTION_CELL: {
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.FLAG_MINE){
        tableData[action.row][action.col] = CODE.QUESTION_MINE;
      } else {
        tableData[action.row][action.col] = CODE.QUESTION;
      }
      return {
        ...state, 
        tableData
      }
    }
    case NORMALIZE_CELL:{
      const tableData = [...state.tableData];
      tableData[action.row] = [...state.tableData[action.row]];
      if (tableData[action.row][action.col] === CODE.QUESTION_MINE){
        tableData[action.row][action.col] = CODE.MINE;
      } else {
        tableData[action.row][action.col] = CODE.NORMAL;
      }
      return {
        ...state, 
        tableData
      }
    }
    default: 
      return state;
  }
}

const MineSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, timer, result, halted } = state;
  const value = useMemo(() => ({tableData, dispatch, halted}), [tableData, halted]);
  // contextAPI를 쓰면 성능최적화가 까다로움. => useMemo를 사용해서 캐싱을 해줘야 함. 
  // tableContext.Provider로 묶어놓으면 하위 컴포넌트에서 접근이 가능
  return (
    <TableContext.Provider value={value}> 
      <Form />
      <div>{timer}</div>
      <Table />
      <div>{result}</div>
    </TableContext.Provider>
  );
};

export default MineSearch;