import React from 'react'

function Price(props) {
  return (
    <span>${props.amount.toFixed(2)}</span>
  )
}

export default Price