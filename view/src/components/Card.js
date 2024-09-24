import React from 'react'
import Card from 'react-bootstrap/Card';
import ButtonComponent from './Button';
import { Link } from 'react-router-dom';
const CardComponent = ({product, onAddToCart}) => {
  const {id, name, description, price, images} = product; 
  const dataToPass = {id, name, description, price, images}

  const handleClick = () => {
    onAddToCart(id)
  }

  return (
    <Card className='h-100' style={{ width: '18rem' }}>
       <Link className='text-decoration-none' to='/productDetails' state={{dataToPass }}>
        <Card.Img variant="top" src={product.images[1]} className='object-fit-contain p-2' style={{height: '200px'}} />
      </Link>
        <Card.Body>
           <Link className='text-decoration-none' to='/productDetails' state={{dataToPass }}><Card.Title>{product.name}</Card.Title></Link>
            <Card.Text>{product.price}</Card.Text>
            <Card.Text>{product.description.substring(0, product.description.indexOf('.')+1)}</Card.Text>
        </Card.Body>
        <ButtonComponent text='Add to Cart'  onClick={handleClick}/>
    </Card>
  )
}

export default CardComponent