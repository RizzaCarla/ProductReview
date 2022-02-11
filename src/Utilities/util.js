import axios from 'axios';

export const getProducts = axios.get('http://localhost:3004/products')
.then((res) => {
  return (res.data)
})

export const reviewProduct = (data) => {
  axios.post('http://localhost:3004/reviews', data)
}

export const getReviews = axios.get('http://localhost:3004/reviews')
.then((res) => {
  return (res.data)
})

export const getProductReviews = (id) =>
  axios.get(`http://localhost:3004/products/${id}/reviews`)
  .then((res) => {
    return (res.data)
  })
