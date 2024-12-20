import React from "react";
import styles from './AddButton.module.css'

const AddButton:React.FC<{children: React.ReactNode, add: (arg: boolean) => void}> = ({ children, add }) => {
  return (
    <button
      className={styles.addButton}
      onClick={() => add(true)}
    >
      {children}
    </button>
  );
};

export default AddButton;
