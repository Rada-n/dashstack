import React from "react";
import styles from "./SuccessModal.module.css";
import Modal from "../modal/Modal";

const SuccessModal: React.FC<{ text: string; onClose: () => void }> = ({
  text,
  onClose,
}) => {
  return (
    <Modal onClose={onClose}>
      <span>{text}</span>
      <button onClick={() => onClose()}>&#10006;</button>
    </Modal>
  );
};

export default SuccessModal;
