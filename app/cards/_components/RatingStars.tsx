import React, { useState } from 'react'
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons'

type Props = {
  rating: number
  onChange: any
}

const RatingStars = ({ rating, onChange }: Props) => {
  const [hoverRating, setHoverRating] = useState(rating)

  const handleMouseMove = (newValue: number) => {
    setHoverRating(newValue)
  }

  const handleMouseLeave = () => {
    setHoverRating(rating)
  }

  const handleClick = (newValue: number) => {
    onChange(newValue)
  }

  return (
    <ul className="flex items-center gap-1 h-12" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((index) => (
        <li key={index} onMouseEnter={() => handleMouseMove(index)} onClick={() => handleClick(index)}>
          {index <= hoverRating || index <= rating ? (
            <StarFilledIcon className="rating-star text-yellow-300" />
          ) : (
            <StarIcon className="rating-star hover:text-yellow-300" />
          )}
        </li>
      ))}
    </ul>
  )
}

export default RatingStars
