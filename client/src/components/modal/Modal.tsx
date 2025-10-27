import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";

interface ModalProps {
    children: React.ReactNode
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleClose = (): void => {
    setIsVisible(true);
    setTimeout((): void => onClose(), 400);
  };

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <section className={styles.overlay} onClick={(): void => handleClose()}>
      <div
        className={`${styles.popup} ${
          isVisible ? styles.slideOut : styles.slideIn
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </section>
  );
};

export default Modal;
