import React, { useState } from 'react';
import Try from './Try';

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

const NumberBaseball = () => {
    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getNumbers());
    const [tries, setTries] = useState([]);

    const onSubmitForm = (e) => {
        e.preventDefault();
        if(value === answer.join('')){
            setResult('홈런!');
            setTries((prevTries) => {
                return [...tries, { try: value, result:'홈런!'}]
            });
            alert('게임을 다시 시작합니다!');
            setValue('');
            setAnswer(getNumbers());
            setTries([]);    
        } else {   // 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length>=9){
                setResult(`횟수 초과! 답은 ${answer.join(',')}였습니다!`);
                alert('게임을 다시 시작합니다!');
                setValue('');
                setAnswer(getNumbers());
                setTries([]);
            } else {
                for(let i = 0; i < 4 ; i++){
                    if(answerArray[i] === answer[i]){
                        strike+=1;
                    } else if (answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                setTries((prevTries) => {
                    return [...tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}];
                });
                setValue('');
            }
        }
    };
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
    };

   
    return (
        <>
            <h1>{result}</h1>
            <form onSubmit = {onSubmitForm}>
                <input maxLength={4} value={value} onChange={onChangeInput} />   
            </form>
            <div>시도 : { tries.length }</div>
            <ul>
                {tries.map((v, i) => {
                    return (
                        <Try key={`${i + 1}차 시도:`} tryInfo={v} /> // html의 attribute와 유사한 역할을 하는 props
                    )
                })}
            </ul>
        </>            
    )
}

export default NumberBaseball;