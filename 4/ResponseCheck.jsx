import React, { useState, useRef } from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요');
  const [result, setResult] = useState([]);
  const startTime = useRef(null);
  const endTime = useRef(0);
  const timeout = useRef(0);
  // useRef의 값이 변동될때는 return 부분이 다시 랜더링되지 않음. 변경되어도 다시 랜더링 시키고 싶지 않은 값이면 useRef에 넣어서 사용. 

  const onClickScreen = () => {
    if ( state === 'waiting' ){
      setState('ready');
      setMessage('초록색이 되면 클릭하세요')
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date();
      }, Math.floor(Math.random() * 1000) + 2000);  // 2초 ~ 3초 사이 랜덤한 시간
    } else if ( state === 'ready' ){  // 성급한 시도
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('성급합니다! 초록색이 된 후에 클릭하세요!');
    } else if ( state === 'now' ){ // 반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current];
      })
    }
  };

  const onReset = () => {
    setResult([]);
  }

  const renderAverage = () => {
    return (
      result.length === 0 
      ? null 
      : <>
          <div>평균 시간 : {result.reduce((a, c) => a + c) / result.length }ms</div>
          <button onClick={onReset}>리셋</button>
        </>
    )
  }

  return(
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
};

export default ResponseCheck;