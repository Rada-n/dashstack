import search from '../../assets/search/search.svg'
import styles from './Search.module.css'
import { useActions } from '../../hooks/useActions'
import { useSelector } from 'react-redux'
import { RootState } from '@reduxjs/toolkit/query'

const Search: React.FC<{placeholder: string}> = ({ placeholder }) => {
  const { setInputSearchProduct } = useActions()
  const { inputSearchProduct } = useSelector((state: RootState) => state.navigate)

  return (
    <div className={styles.searchContainer}>
        <img src={search} className={styles.loupeicon}/>
        <input type="text" placeholder={placeholder} className={styles.searchInput} onChange={e => setInputSearchProduct(e.target.value)} value={inputSearchProduct}/>
    </div>
  )
}

export default Search
