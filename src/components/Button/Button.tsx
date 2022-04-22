import './index.css'
import React from 'react'

interface ButtonInterface {
  callback?: (() => void);
  value: string;
}

export default function Button ({value, callback} :ButtonInterface){
  return (
    <button className="btn" onClick={callback}>
      {value}
    </button>
  )
}