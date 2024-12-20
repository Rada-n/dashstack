import React from 'react'
import styles from './Layout.module.css'

const Layout = ({children}: React.PropsWithChildren) => {
  return (
    <div className={styles.mainContainer}>
      <main className={styles.mainWrapper}>
        {children}
      </main>
    </div>
  )
}

export default Layout
