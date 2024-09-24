import React from 'react'
import Button from 'react-bootstrap/esm/Button'
const ButtonComponent = ({text, onClick}) => {
  return (
    <Button onClick={onClick}>{text}</Button>
  )
}

export default ButtonComponent