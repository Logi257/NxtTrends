import React, {useEffect, useState} from 'react'
import {useParams, useHistory} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import SimilarProductItem from '../SimilarProductItem'
import './index.css'

const ProductItemDetails = () => {
  const {id} = useParams()
  const history = useHistory()
  const [productDetails, setProductDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true)
      try {
        const response = await fetch(`https://apis.ccbp.in/products/${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${Cookies.get('jwt_token')}`,
          },
        })
        if (!response.ok) {
          throw new Error('Product not found')
        }
        const data = await response.json()
        setProductDetails(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }

    fetchProductDetails()
  }, [id])

  const handleContinueShopping = () => {
    history.push('/products')
  }

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
  }

  if (loading) {
    return (
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="error view"
        />
        <button onClick={handleContinueShopping} type="button">
          Continue Shopping
        </button>
      </div>
    )
  }

  return (
    <div className="product-details">
      <img src={productDetails.image_url} alt="product" />

      <h1>{productDetails.title}</h1>
      <p>{productDetails.description}</p>
      <p>{productDetails.rating}</p>

      <p>{productDetails.availability}</p>
      <p>{productDetails.brand}</p>
      <p>Price: ₹{productDetails.price}</p>
      <div className="quantity-controls">
        <button data-testid="minus" onClick={decrementQuantity} type="button">
          <BsDashSquare />
        </button>
        <span>{quantity}</span>
        <button data-testid="plus" onClick={incrementQuantity} type="button">
          <BsPlusSquare />
        </button>
      </div>
      <button type="button">ADD TO CART</button>
      <h2>Similar Products</h2>

      <div className="similar-products">
        {productDetails.similar_products.map(product => (
          <SimilarProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

const getCookie = name => {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
  return undefined
}
export default ProductItemDetails
