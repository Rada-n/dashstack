import React, { useState } from 'react'
import styles from './OptionButton.module.css'
import { useActions } from '../../../hooks/useActions'
import { useSelector } from 'react-redux'
import { AppState } from '../../../store/store';

const OptionButton: React.FC<{ option: string; title: string }> = ({ option, title }) => {
    const { ordersType, ordersStatus } = useSelector((state: AppState) => state.orders);
    const { setOptionsType, setOptionsStatus } = useActions()
    
    const isSelected = title === 'Type' ? ordersType.includes(option) : ordersStatus.includes(option);
    
    const handleClickSelectOption = () => {
        if (title === 'Type') {
            setOptionsType(option);
        } else {
            setOptionsStatus(option);
        }
    };

    return (
        <button 
            onClick={handleClickSelectOption} 
            className={`${styles.button} ${isSelected ? styles.clicked : styles.inactive}`}
        >
            {option}
        </button>
    );
};
export default OptionButton
