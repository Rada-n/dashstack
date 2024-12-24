import React from 'react'
import styles from './SeeMoreButton.module.css'

const SeeMoreButton:React.FC<{children: React.ReactNode, setMore: () => void }> = ({ children, setMore }) => {
  return (
    <button className={styles.button} onClick={() => setMore()}>
      {children}
    </button>
  )
}

export default SeeMoreButton
