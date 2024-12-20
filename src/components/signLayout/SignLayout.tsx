import React from 'react'
import styles from './SignLayout.module.css'

const SignLayout:React.FC<{children: React.ReactNode}> = ({ children }) => {
  return (
    <div className={styles.mainWrapper}>
      <main className={styles.mainContainer}>
         {children}
      </main>
    </div>
  )
}

export default SignLayout
