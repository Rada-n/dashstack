import React from 'react'
import styles from './SignButton.module.css'

const SignButton:React.FC<{children: React.ReactNode; disabled: boolean}> = ({ children, disabled }) => {
  return (
    <button type='submit' disabled={disabled} className={styles.buttonSubmit}>
      { children }
    </button>
  )
}

export default SignButton
