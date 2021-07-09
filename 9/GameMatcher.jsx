import React, { Component } from 'react';
import NumberBaseball from '../3/NumberBaseballClass';
import RSP from '../5/RSPClass';
import Lotto from '../6/LottoClass';

export default class GameMatcher extends Component{
  render(){
    let urlSearchParams = new URLSearchParams(this.props.location.search.slice(1));
    console.log(urlSearchParams.get('hello'));
    if(this.props.match.params.name === 'number-baseball'){
      return <NumberBaseball />
    } else if (this.props.match.params.name === 'rock-scissors-paper') {
      return <RSP />
    } else if (this.props.match.params.name === 'lotto-generator'){
      return <Lotto/>
    }
    return (
      <div>
        일치하는 게임이 없습니다.
      </div>
    )
  }
}