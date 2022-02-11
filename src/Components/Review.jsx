import React, { Fragment, useEffect, useState } from 'react';
import {getProducts, reviewProduct} from '../Utilities/util';
import { Row, Col, Dropdown, Card, Container, Button } from 'react-bootstrap';
import Rating from '@mui/material/Rating';
import '../Styles/Review.scss';

const Review = () => {

  const [products, setProducts] = useState([])
  const [name, setName] = useState("")
  const [title, setTitle] = useState("")
  const [review, setReview] = useState("")
  const [stars, setStars] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState({})

  useEffect(() => {
    getProducts.then(res => {
      setProducts(res)
    })
  }, [])
  
  const handleDropdown = (product) => {
    setSelectedProduct(product)
    let dropdownToggle = document.getElementById("dropdown-basic")
    dropdownToggle.innerHTML = product.name
  }

  const handleSubmit = () => {
    // data exmaple: 
    // {
    // "id": 1,
    // "author": "Oliver",
    // "star_rating": 5,
    // "headline": "I love this product!",
    // "body": "This sofa has completely changed my life. The delivery process couldn't have been easier. I want to sing about Oliver Space from the rooftops!",
    // "productId": "0"
    // }
    reviewProduct({
      'author': name,
      'star_rating': stars,
      'headline': title,
      'body': review,
      'productId': selectedProduct.id,
    })

    setName("")
    setTitle("")
    setStars(0)
    setReview("")
    setSelectedProduct({})
    let dropdownToggle = document.getElementById("dropdown-basic")
    dropdownToggle.innerHTML = "Select Product..."

    let hiddentext = document.getElementById('submitted')
    hiddentext.style.display = 'block'
  }

  return (
    <Container className='pt-5 pb-5 pl-1 pr-1'>
      <Row className='d-flex justify-content-center align-items-center'>
        <Card>
          <Card.Body>
            <Row className='d-flex flex-row justify-content-around text-center'>
              <Col>
                <a href="/">Back to Home</a>
              </Col>
              <Col>
                <a href="/product-reviews">View all Reviews</a>
              </Col>
            </Row>
            <Row className='d-flex flex-column p-5 justify-content-center align-items-center'>
              <Card.Title>
                <h1>Review Product</h1>
                <small className='hide' id='submitted'>Review submited!</small>
                <hr></hr>
              </Card.Title>
              <Col>
                <Dropdown className='pb-3'>
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select Product...
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {products.map((product, index) => {
                      return (
                        <Dropdown.Item onClick={() => handleDropdown(product)} key={index}>{product.name}</Dropdown.Item>
                      )
                    })}
                  </Dropdown.Menu>
                </Dropdown>
                <p>Name: <input value={name} onChange={e => setName(e.target.value)}></input></p>
                <p>Rating: <Rating
                  name="simple-controlled"
                  value={stars}
                  onChange={(event, newValue) => {
                    setStars(newValue);
                  }}
                /> </p> 
                <p>Review Title: <input value={title} onChange={e => setTitle(e.target.value)}></input></p>
                <p>Review: <textarea value={review} onChange={e => setReview(e.target.value)}></textarea></p>
                <Button variant='success' onClick={() => handleSubmit()}>Submit</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  )
}

export default Review