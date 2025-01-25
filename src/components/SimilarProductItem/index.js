import React from 'react'
import './index.css'

const SimilarProductItem = ({product}) => (
  <div className="similar-product-item">
    <img src={product.image_url} alt={`similar product ${product.title}`} />
    <h3>{product.title}</h3>
    <p>Price: ₹{product.price}</p>
  </div>
)

export default SimilarProductItem
