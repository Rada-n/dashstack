import React from 'react'
import YellowStar from '../../../assets/products/rating/YellowStar.svg'
import GrayStar from '../../../assets/products/rating/GrayStar.svg'

const ProductRating: React.FC<{rating: number}> = ({ rating }) => {
    const yellowStars = Math.round(rating)
    const grayStars = 5 - yellowStars

  return (
    <span>
      {[...Array(yellowStars)].map((_, i) => (
        <img key={i} src={YellowStar} alt={`Yellow star ${i + 1}`}/>
      ))}
      {[...Array(grayStars)].map((_, i) => (
        <img key={i} src={GrayStar} alt={`Gray Star ${i + yellowStars + 1}`}/>
      ))}
    </span>
  )
}

export default ProductRating
