import React, { useEffect, useState } from "react";
import styles from "./Loading.module.css";

const Loading = () => {
  const numSticks = 12;
  const [activeStickIndex, setActiveStickIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveStickIndex((prevIndex) => (prevIndex + 1) % numSticks);
    }, 100);

    return () => clearInterval(intervalId);
  }, []);

  const sticks = Array.from({ length: numSticks }, (_, i) => (
    <span
      key={i}
      className={`${styles.stick} ${
        i === activeStickIndex ? styles.active : ""
      }`}
      style={{ transform: `rotate(${i * 30}deg)` }}
    />
  ));

  return <div className={styles.clock}>{sticks}</div>;
};

export default Loading;
