import React, { FC } from 'react'
import Modal from '../modal/Modal'
import { Link } from 'react-router-dom'
import styles from './ModalAuth.module.css'

const ModalAuthUser: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <Modal onClose={onClose}>
            <p className={styles.info}>This action is available only to authorized users.</p>
            <Link to="/signin">Sign in!</Link>
    </Modal>
  )
}

export default ModalAuthUser
