import React, { memo } from 'react';

const Try = memo(({ TryInfo }) => {
  return (
      <li>{ TryInfo }</li>    
  )
})

export default Try;