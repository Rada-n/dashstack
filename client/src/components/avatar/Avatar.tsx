import React from 'react'
import AvatarImage from '../../assets/menu/AvatarImage.png'
import styles from './Avatar.module.css'
import { useLocalStrorage } from '../../hooks/useLocalStrorage'

const Avatar:React.FC = () => {
  const {storedValue: currentUser} = useLocalStrorage('currentUser', {})
  const currentUserImage = currentUser?.image

  return (
    <div className={styles.avatarContainer}>
      <img src={currentUserImage ? currentUserImage : AvatarImage} className={styles.avatarImage} />
    </div>
  )
}

export default Avatar
