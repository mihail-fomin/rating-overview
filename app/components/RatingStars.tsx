import React from 'react'
import { StarIcon, StarFilledIcon } from '@radix-ui/react-icons'

type Props = {
  rating: number
}

const RatingStars = ({ rating }: Props) => {
  return (
    <ul className="flex items-center h-12">
      {[1, 2, 3, 4, 5].map((index) => (
        <li key={index}>
          {index <= rating ? (
            <StarFilledIcon className="rating-star w-6 h-6 text-yellow-300 pointer-events-none" />
          ) : (
            <StarIcon className="rating-star w-6 h-6 pointer-events-none" />
          )}
        </li>
      ))}
    </ul>
  )
}

export default RatingStars
