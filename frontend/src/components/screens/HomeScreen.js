import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { productListAction } from '../../redux/actions/productActions'
import Loader from '../uiElements/Loader'
import Message from '../uiElements/Message'
import PaginationElement from '../uiElements/PaginationElement'
import Product from '../uiElements/Product'
import { useParams } from 'react-router-dom'
import ProductCarousel from '../uiElements/ProductCarousel'

const HomeScreen = () => {
  document.title = 'Welcome to eShop'
  const dispatch = useDispatch()
  const { pageNumber } = useParams()

  const { loading, error, products, pages, currentPage } = useSelector(
    (state) => state.productList
  )

  useEffect(() => {
    dispatch(productListAction('', pageNumber, 2))
  }, [dispatch, pageNumber])

  return (
    <>
      <Row>
        <ProductCarousel></ProductCarousel>
      </Row>
      <Row className=''>
        <h2 className='text-align-center'>Latest Products</h2>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((item) => (
              <Col key={item._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={item} />
              </Col>
            ))}
          </Row>
          <div className='d-flex justify-content-center'>
            <PaginationElement pages={pages} currentPage={currentPage} />
          </div>
        </>
      )}
    </>
  )
}

export default HomeScreen
