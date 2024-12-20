import React from "react"
import styles from './DealsStatusButton.module.css'

interface ColorsStatus {
    [index: string]: string
}

const colorsStatus: ColorsStatus = {
    Delivered: 'rgba(0, 182, 155, 1)',
    Pending: 'rgba(254, 197, 61, 1)',
    Shipped: 'rgba(130, 128, 255, 1)'
}

export const DealsStatusButton: React.FC<{status: string}> = ({ status }) => {

    return (
        <button style={{ backgroundColor: colorsStatus[status] }} className={styles.button}>
            {status}
        </button>
    )
}