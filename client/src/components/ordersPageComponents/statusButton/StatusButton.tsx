import React from 'react'
import styles from './StatusButton.module.css'

interface StatusColors {
    [index: string]: string
}

const statusColors: StatusColors = {
    'Completed': '0, 182, 155',
    'Processing': '98, 38, 239',
    'Rejected': '239, 56, 38',
    'On hold': '255, 167, 86',
    'In transit': '50, 89, 255'
}

const StatusButton: React.FC<{status: string}> = ({ status }) => {
  return (
    <button style={{ backgroundColor: `rgba(${statusColors[status]}, 0.2)`, color: `rgba(${statusColors[status]}, 1)` }} className={styles.statusButton}>
      {status}
    </button>
  )
}

export default StatusButton