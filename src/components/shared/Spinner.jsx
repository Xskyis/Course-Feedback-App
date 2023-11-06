import React from 'react'
import spinner from '../assets/Gear-0.2s-200px trsn.gif'

function Spinner () {
  return (
    <img
      src={spinner}
      alt='Loading...'
      style={{ width: '100px', margin: 'auto', display: 'block' }}
    />
  )
}

export default Spinner
