import React, { PureComponent, createRef } from 'react';
import Try from './TryClass';

function getNumbers(){
    const candidate = [1,2,3,4,5,6,7,8,9];
    const array = [];
    for(let i = 0; i < 4; i++){
        const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
        array.push(chosen);
    }
    return array;
}

class NumberBaseballClass extends PureComponent {
    state = {
        result: '',
        value: '',
        answer : getNumbers(),
        tries: [],  // 배열에 값을 넣을 때 push 쓰면 X
    };

    inputRef = createRef();

    onSubmitForm = (e) => {
        const { value, result, tries, answer } = this.state;
        e.preventDefault();
        if(value === answer.join('')){
            this.setState((prevState) => {
                return {
                    result: '홈런!',
                   tries: [...prevState.tries, { try: value, result:'홈런!'}], // 기존 배열에 새로운 원소 추가. push로 추가하면 tries === tries 임으로 바뀐게 없음->랜더가 일어나지 X
                }
            });
            alert('게임을 다시 시작합니다!');
            this.setState({
                value: '',
                answer: getNumbers(),
                tries: [],
            })
            this.inputRef.current.focus();
        } else {   // 틀린 경우
            const answerArray = value.split('').map((v) => parseInt(v));
            let strike = 0;
            let ball = 0;
            if(tries.length>=9){
                this.setState({
                    result: `횟수 초과! 답은 ${answer.join(',')}였습니다!`,
                })
                alert('게임을 다시 시작합니다!');
                this.setState({
                    value: '',
                    answer: getNumbers(),
                    tries: [],
                });
                this.inputRef.current.focus();
            } else {
                for(let i = 0; i < 4 ; i++){
                    if(answerArray[i] === answer[i]){
                        strike+=1;
                    } else if (answer.includes(answerArray[i])){
                        ball+=1;
                    }
                }
                this.setState((prevState) => {
                    return {
                        tries: [...prevState.tries, { try: value, result: `${strike} 스트라이크, ${ball} 볼입니다`}],
                        value:'',
                    }
                })
                this.inputRef.current.focus();
            }

        }
    };

    onChangeInput = (e) => {
        this.setState({
            value:e.target.value,
        });
    };

    render() {
        const { value, result, tries } = this.state;
        return (
            <>
                <h1>{result}</h1>
                <form onSubmit = {this.onSubmitForm}>
                    <input ref = {this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput} />   
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

}

export default NumberBaseballClass;