import React, { Fragment, useEffect, useState } from 'react';
import '../Styles/Review.scss';
import { Row, Col, Accordion, Card, Container, Toast, ToastContainer } from 'react-bootstrap';
import { getProducts, getReviews } from '../Utilities/util';
import Rating from '@mui/material/Rating';

const ProductReview = () => {
  const [products, setProducts] = useState([])
  const [productReviews, setProductReviews] = useState([])

  useEffect(() => {
    getProducts.then(res => {
      setProducts(res)
    })
  }, [])

  useEffect(() => {
    getReviews.then(res => {
      setProductReviews(res)
    })
  }, [products])
  
  return (
    <Container className='pt-5 pb-5 pl-1 pr-1'>
      <Row className='d-flex flex-row justify-content-around text-center'>
        <Col>
          <a href="/">Back to Home</a>
        </Col>
        <Col>
          <a href="/review">Review a Product</a>
        </Col>
      </Row>
      <Row className='text-center'>
        <h1>Product Reviews</h1>
      </Row>
      <Row className='d-flex justify-content-center align-items-center'>
        {products.map((product, index) => {
          return (
            <Card className='m-3'>
              <Card.Body>
                <Row>
                  <Fragment key={index} eventKey={index}>
                      <h5>{product.name}</h5>
                      <hr></hr>
                      {productReviews.map((review, index2) => {
                        if (review.productId === product.id) {
                            console.log(review.author)
                            return (
                              <ToastContainer key={index2}>
                                <Toast>
                                  <Toast.Header closeButton={false}>
                                    <h5>{review.headline}</h5>
                                  </Toast.Header>
                                  <Toast.Body>
                                    <p>Name: {review.author}</p>
                                    <p>Rating: <Rating
                                      value={review.star_rating}
                                      readOnly 
                                    /></p>
                                    <p>"{review.body}"</p>
                                  </Toast.Body>
                                </Toast>
                              </ToastContainer>
                            )
                        }
                      })}
                    {/* </Accordion.Body> */}
                  </Fragment>
                </Row>
              </Card.Body>
            </Card>
          )
        })}
      </Row>
    </Container>
  )
}

export default ProductReview