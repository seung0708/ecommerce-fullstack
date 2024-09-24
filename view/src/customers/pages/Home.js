import Container from 'react-bootstrap/esm/Container';

import React, {useState, useEffect} from 'react'
import Products from './Products'
import { Link } from 'react-router-dom';

const Home = ({products, onAddToCart}) => {
  
  
  return (
    <Container>
      <Products products={products} onAddToCart={onAddToCart}/>
    </Container>
  )
}

export default Home

   