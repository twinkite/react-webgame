import React from 'react';
import { Route, Link, HashRouter } from 'react-router-dom';
import NumberBaseball from '../3/NumberBaseballClass';
import RSP from '../5/RSPClass';
import Lotto from '../6/LottoClass';
import GameMatcher from './GameMatcher';

const Games = () => {
  
  return (
    <HashRouter>
      <Link to="/game/number-baseball?hello=twinkite">숫자야구</Link>
      &nbsp;
      <Link to="/game/rock-scissors-paper">가위바위보</Link>
      &nbsp;
      <Link to="/game/lotto-generator">로또</Link>
      &nbsp;
      <Link to="/game/index">게임 매쳐</Link>
      <div>
        <Route path ="/game/:name" component={GameMatcher}></Route>
      </div>
    </HashRouter>
  );
};

export default Games;