import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import CardComponent from '../../components/Card';

const Products = ({products, onAddToCart}) => {
  return (
    <Container>
    <Row>
      {products.map((product, index) => (
        <Col key={index} sm={12} md={6} lg={4} xl={3} className="mb-4">
            <CardComponent product={product} onAddToCart={onAddToCart}/>
        </Col>
      ))}
      </Row>
    </Container>
  )
}

export default Products