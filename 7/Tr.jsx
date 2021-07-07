import React, { useEffect, useRef, memo } from 'react';
import Td from './Td';

const Tr = memo(({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');
  const ref = useRef([]);
  useEffect(() => {
      console.log(rowIndex === ref.current[0], rowData ===ref.current[1], dispatch === ref.current[2]);
      ref.current=[rowIndex, rowData, dispatch];
  }, [rowIndex, dispatch, rowData]);
  return (
    <tr>
      {Array(rowData.length).fill().map((td, i) => (<Td key={i} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]} dispatch={dispatch}>{''} </Td>))}
    </tr>
  );
});

export default Tr;