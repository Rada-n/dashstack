import React from "react";
import styles from "./SuccessModal.module.css";
import Modal from "../modal/Modal";
import UpperModal from "../upperModal/UpperModal";

const SuccessModal: React.FC<{ text: string; onClose: () => void }> = ({
  text,
  onClose,
}) => {
  return (
    <UpperModal onClose={onClose}>
      <span>{text}</span>
      <button onClick={() => onClose()}>&#10006;</button>
    </UpperModal>
  );
};

export default SuccessModal;
