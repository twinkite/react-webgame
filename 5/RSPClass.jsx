import React, { Component } from 'react';
import TryClass from './TryClass';

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

class RSPClass extends Component {
  state = {
    result: '',
    imgCoord: rspCoords.바위,
    score: 0,
    history: [],
  };
  
  interval;

  componentDidMount() {  // 비동기 요청 setInterval()은 컴포넌트가 사라진 이후에도 계속 실행된다. => 메모리 누수
    this.interval = setInterval(this.changeHand, 100);
  }

  componentDidUpdate() { // 리렌더링 후에 실행된다. 

  }

  componentWillUnmount() { // 비동기 요청 정리
    clearInterval(this.interval); 
  }

  changeHand = () => {
    const { imgCoord } = this.state;
    if ( imgCoord === rspCoords.바위 ){
      this.setState({
        imgCoord: rspCoords.가위,
      })
    } else if ( imgCoord === rspCoords.가위 ){
      this.setState({
        imgCoord: rspCoords.보,
      })
    } else if ( imgCoord === rspCoords.보 ){
      this.setState({
        imgCoord: rspCoords.바위,
      })
    }
  };

  onClickBtn = (choice) => () => {
    const { imgCoord } = this.state;
    clearInterval(this.interval);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if ( diff === 0 ){
      this.setState((prevState) => {
        return {
          result: '비겼습니다.',
          history: [...prevState.history, '무승부'],
      }});
    } else if ([-1, 2].includes(diff)) {
      this.setState((prevState) => {
        return {
          result: '이겼습니다',
          score: prevState.score + 1,
          history: [...prevState.history, '승리'],
        }
      });
    } else {
      this.setState((prevState) => {
        return {
          result: '졌습니다',
          score: prevState.score - 1,
          history: [...prevState.history, '패배'],
        }
      })
    }
    setTimeout(()=> {
      this.interval = setInterval(this.changeHand, 100);
    }, 2000);
  };

  render() {
    const { result, score, imgCoord, history } = this.state;
    return(
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }} />
      <div>
        <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score}점</div>
      <div>
        <ul>
          {history.map((v, i) => {
              return (
                <TryClass key={`${i + 1}차 시도:`} tryInfo={v} /> // html의 attribute와 유사한 역할을 하는 props
              )
          })}
        </ul>
      </div>
    </>
    )};
}

export default RSPClass;