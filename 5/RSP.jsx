import React, { useState, useRef, useEffect, memo } from 'react';
import Try from './Try';

const rspCoords = {
  바위: '0',
  가위: '-142px',
  보: '-284px',
};

const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v){
    return v[1] === imgCoord;
  })[0];
};

const RSP = memo(() => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState(rspCoords.바위);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);
  const interval = useRef();

  useEffect(() => { //componentDidMount, componentDidUpdate 역할(1대1 대응은 아님)
    interval.current = setInterval(changeHand, 100);
    return () => {  // componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]); // 두번째 인수 배열에 넣은 값들이 바뀔 때(imgCoord) useEffect가 실행된다.

  const changeHand = () => {
    if ( imgCoord === rspCoords.바위 ){
      setImgCoord(rspCoords.가위);
    } else if ( imgCoord === rspCoords.가위 ){
        setImgCoord(rspCoords.보);
    } else if ( imgCoord === rspCoords.보 ){
        setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if ( diff === 0 ){
      setResult('비겼습니다');
      setHistory((prevHistory) => {
        return [...prevHistory, '무승부'];
      })
    } else if ([-1, 2].includes(diff)) {
      setResult('이겼습니다');
      setScore((prevScore) => prevScore + 1);
      setHistory((prevHistory) => {
        return [...prevHistory, '승리'];
      });
    } else {
      setResult('졌습니다');
      setScore((prevScore) =>  prevScore - 1);
      setHistory((prevHistory) => {
        return [...prevHistory, '패배'];
      });
    }
    setTimeout(()=> {
      interval.current = setInterval(changeHand, 100);
    }, 2000);
  };
  
  return(
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
      <div>
        <ul>
          {history.map((v, i) => {
              return (
                <Try key={`${i + 1}차 시도:`} tryInfo={v} /> // html의 attribute와 유사한 역할을 하는 props
              )
          })}
        </ul>
      </div>
    </>
    )
});

export default RSP;