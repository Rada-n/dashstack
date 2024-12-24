import React from 'react'
import Star from '../../star/Star'

const Dialog:React.FC = ({ username }) => {
  return (
    <article>
      <input type='checkbox' />
      <Star />
      <span>{username}</span>
    </article>
  )
}

export default Dialog
