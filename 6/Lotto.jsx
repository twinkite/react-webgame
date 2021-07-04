import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import Ball from './Ball';
// useMemo는 함수의 결괏값을 기억하고 useCallback은 함수 자체를 기억한다. 
// useCallback은 함수 생성시간이 오래걸릴 때 사용. 
function getWinNumbers(){
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v,i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0){
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p,c) => p - c);
  return [...winNumbers, bonusNumber];
}
// Hooks는 조건문안에 절대 넣으면 X. 반복문, 함수안에도 가급적 넣지 X
const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); // useMemo : 복잡한 함수 결괏값을 기억.
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // componentDidUpdate() 만 실행하고 싶을 때(componentDidMount는 필요 X)
  // const mounted = useRef(false);
  // useEffect(() => {
  //   if(mounted.current){
  //     mounted.current = true;  // 처음 랜더링 때 useEffect가 실행되지만 아무것도 안함
  //   } else {
  //     //
  //   }
  // }, [바뀌는 값]);
  
  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++){
      timeouts.current[i] = setTimeout(() => {
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000);
    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    };
  }, [timeouts.current]); // 빈 배열이면 componentDidMount
  // 배열에 요소가 있으면 componentDidMount와 componentDidUpdate 둘 다 수행
  // return 에서 componentWillUnmount 역할 수행
  
  // 자식컴포넌트에 prop으로 함수를 넘길 때는 필수적으로 함수에 useCallback을 해줘야한다.
  const onClickRedo = useCallback(() => {
    console.log('onClickRedo');
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v} />)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} onClick={onClickRedo} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  );
}

export default Lotto;