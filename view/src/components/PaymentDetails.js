import React, {useState} from 'react'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

const PaymentDetails = ({orderCheckout}) => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (e)=> {
    setPaymentMethod(e.target.value);
  }

  return (
    <>
     <div className="box-inner-2">
        <div>
          <p className="fw-bold">Payment Details</p>
          <p className="dis mb-3">Complete your purchase by providing your payment details</p>
        </div>
        <Form>
          {/*<
          <Form.Group className="mb-3">
            Form.Label className="dis fw-bold">Email address</Form.Label>
             <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> 
          </Form.Group>
          */}
          <Form.Group className="mb-3">
            <Form.Label className="dis fw-bold">Payment Method</Form.Label>
              <Form.Select value={paymentMethod} onChange={handlePaymentMethodChange}>
                <option>Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="stripe">Stripe</option>
              </Form.Select>
          </Form.Group>

          {paymentMethod === 'creditCard' &&  (  
            <div>
              <Form.Group className="mb-3">
                <Form.Label className="dis fw-bold">Card details</Form.Label>
                <InputGroup className="card-atm border rounded">
                  <InputGroup.Text className="fab fa-cc-visa ps-3"></InputGroup.Text>
                  <Form.Control
                    type="text"
                    placeholder="Card Details"
                    // value={cardDetails}
                    // onChange={(e) => setCardDetails(e.target.value)}
                  />
                </InputGroup>
              </Form.Group>
              <Form.Group className="mb-3 d-flex">
                <Form.Control
                  type="text"
                  placeholder="MM/YY"
                  style={{ width: '50%' }}
                />
                <Form.Control
                  type="password"
                  maxLength={3}
                  placeholder="CVV"
                  style={{ width: '50%' }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="dis fw-bold">Cardholder name</Form.Label>
                {/* <Form.Control
                  type="text"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                /> */}
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label className="dis fw-bold">Billing address</Form.Label>
                {/* <Form.Select
                  value={billingAddress}
                  onChange={(e) => setBillingAddress(e.target.value)}
                >
                  <option value="United States">United States</option>
                  <option value="India">India</option>
                  <option value="Australia">Australia</option>
                  <option value="Canada">Canada</option>
                </Form.Select> */}
              </Form.Group>
              <Row className="mb-3">
                <Col>
                  {/* <Form.Control
                    type="text"
                    placeholder="ZIP"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  /> */}
                </Col>
                <Col>
                  {/* <Form.Control
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  /> */}
                </Col>
              </Row>
            </div>
            )}
          <div className="my-3">
            {/* <Row className="mb-2">
              <Col className="d-flex justify-content-between">
                <p>Subtotal</p>
                <p><span className="fas fa-dollar-sign"></span>33.00</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="d-flex justify-content-between">
                <p>Tax <span>(9.5%)</span></p>
                <p><span className="fas fa-dollar-sign"></span>2.80</p>
              </Col>
            </Row>
            <Row className="mb-2">
              <Col className="d-flex justify-content-between">
                <p className="fw-bold">Total</p>
                <p className="fw-bold"><span className="fas fa-dollar-sign"></span>total</p>
              </Col>
            </Row> */}
            <Button variant="primary" className="mt-2" onClick={() => orderCheckout(paymentMethod)}>
              Pay<span className="fas fa-dollar-sign px-1"></span>total
          </Button>
    </div>
        </Form>
      </div>
    </>
  )
}

export default PaymentDetails