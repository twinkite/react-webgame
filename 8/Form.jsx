import React, { useState, useCallback, useContext } from 'react';

const Form = () => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext);

  const onChangeRow = useCallback(() => {
    setRow(e.target.value);
  }, []);

  const onChangeCol = useCallback(() => {
    setCol(e.target.value);
  }, []);

  const onChangeMine = useCallback(() => {
    setMine(e.target.value);
  }, []);

  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, cell, mine }, [row, cell, mine]);
  }, []);

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={col} onChange={onChangeCol} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  )
}

export default Form;