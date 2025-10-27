import React from 'react'
import AvatarImage from '../../assets/menu/AvatarImage.png'
import styles from './Avatar.module.css'
import { useLocalStrorage } from '../../hooks/useLocalStrorage'

const Avatar:React.FC<{ image: string }> = ({ image }) => {

  return (
    <div className={styles.avatarContainer}>
      <img src={image ? image : AvatarImage} className={styles.avatarImage} />
    </div>
  )
}

export default Avatar
