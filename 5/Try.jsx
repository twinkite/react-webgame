import React, { memo } from 'react';

const Try = memo(({ tryInfo }) => {
  return (
      <li>{ tryInfo }</li>    
  )
})

export default Try;