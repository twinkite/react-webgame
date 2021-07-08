import React from 'react';
import { BrowserRouter, Route, Link, HashRouter } from 'react-router-dom';
import NumberBaseball from '../3/NumberBaseballClass';
import RSP from '../5/RSPClass';
import Lotto from '../6/LottoClass';

const Games = () => {
  
  return (
    <BrowserRouter>
      <Link to="/number-baseball">숫자야구</Link>
      &nbsp;
      <Link to="/rock-scissors-paper">가위바위보</Link>
      &nbsp;
      <Link to="/lotto-generator">로또</Link>
      <div>
        <Route path ="/number-baseball" component={NumberBaseball}></Route>
        <Route path ="/rock-scissors-paper" component={RSP}></Route>
        <Route path ="/lotto-generator" component={Lotto}></Route>
      </div>
    </BrowserRouter>
  );
};

export default Games;