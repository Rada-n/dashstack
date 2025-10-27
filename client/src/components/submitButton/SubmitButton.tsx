import React from 'react'
import styles from './SubmitButton.module.css'

const SubmitButton:React.FC<{children: React.ReactNode; disabled?: boolean}> = ({ children, disabled }) => {
  return (
    <button type='submit' disabled={disabled} className={styles.buttonSubmit}>
      { disabled ? "Loading..." : children }
    </button>
  )
}

export default SubmitButton
