import React from 'react'
import styles from './SortProducts.module.css'

interface SortProductsProps {
    filter: string
    setFilter: (value: string) => void
    sortCategory: string
    setSortCategory: (value: string) => void
    sortDirection: string
    setSortDirection: (value: string) => void
}

const SortProducts: React.FC<SortProductsProps> = ({ filter, setFilter, sortCategory, setSortCategory, sortDirection, setSortDirection }) => {
  return (
    <div className={styles.sortProductsContainer}>
      <label className={styles.label}>
            Filter by:
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className={styles.select}>
            {["All", "Watch", "Laptop", "Smartphone"].map((productsType, index) => (
              <option value={productsType} key={index} >{productsType}</option>
            ))}
          </select>
      </label>
      <label className={styles.label}>
        Sort by:
        <select value={sortCategory} onChange={(e) => setSortCategory(e.target.value)} className={styles.select}>
          {["All", "Price", "Rating"].map((category, index) => (
            <option value={category} key={index}>{category}</option>
          ))}
        </select>
        <select value={sortDirection} onChange={(e) => setSortDirection(e.target.value)} className={styles.select}>
          {["All", "Increase", "Decrease"].map((direction, index) => (
            <option value={direction} key={index}>{direction}</option>
          ))}
        </select>
      </label>
    </div>
  )
}

export default SortProducts
