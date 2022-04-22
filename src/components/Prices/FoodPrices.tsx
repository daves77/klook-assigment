import './index.css'
import React from 'react'


interface FoodPricesInterface {
  originalPrice: string;
  discountedPrice: string;
}

export default function FoodPrices({originalPrice, discountedPrice}: FoodPricesInterface) {

  return (
    <div className="food-price-wrapper">
      <h4 className="food-price">
      {originalPrice}
      </h4>

      <h5 className="discounted-food-price">{discountedPrice}</h5>
    </div>
  )
}