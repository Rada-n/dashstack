import React from 'react'
import toNextPage from '../../../assets/orders/button/toNextPage.svg'
import toPrevPage from '../../../assets/orders/button/toPrevPage.svg'

interface ChangePageButtonProps {
    prevPage: boolean 
    isLastPage: boolean
    changePage: () => void
}

const ChangePageButton: React.FC<ChangePageButtonProps> = ({ prevPage, isLastPage, changePage }) => {
  return (
    <button onClick={() => changePage()} style={{ width: '43px'}}>
        <img src={prevPage ? toPrevPage : toNextPage} style={isLastPage ? {opacity: '0.5'} : {} } />
    </button>
  )
}

export default ChangePageButton
