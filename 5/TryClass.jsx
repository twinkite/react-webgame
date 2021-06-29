import React, { Component } from 'react';

class TryClass extends Component {
  render(){
    const { tryInfo } = this.props;
    return (
      <li>{tryInfo}</li>    
    )
}}

export default TryClass;