import styles from "./Total.module.css";
import ArrowUp from '../../../assets/dashboard/ArrowUp.svg'
import ArrowDown from '../../../assets/dashboard/ArrowDown.svg'

interface TotalProps {
  name: string;
  color: string;
  image: string;
  amount: string | number;
  difference: number;
  interval: string;
}

const Total: React.FC<TotalProps> = ({
  name,
  color,
  image,
  amount,
  difference,
  interval,
}) => {
  const isPositive = difference > 0

  const truncate = (amount: number, maxLength = 6) => {
    let amountString = amount + "";
    return amountString.length > maxLength ? amountString.slice(0, maxLength) + "..." : amountString;
  };

  return (
    <div className={styles.totalInner}>
      <div className={styles.infoContainer}>
        <h6 className={styles.name}>
          Total {name} <br />
          <strong className={styles.amount}>{truncate(amount)}</strong>
        </h6>
        <div
          className={styles.totalIconContainer}
          style={{ backgroundColor: color }}
        >
          <img src={image} alt={name} className={styles.totalIcon} />
        </div>
      </div>
      <div className={styles.differenceContainer}>
          <span className={styles.arrowContainer}><img src={isPositive ? ArrowUp : ArrowDown} alt="" /></span>
          <span className={styles.difference}>
            <span
              style={{
                color: isPositive
                  ? "rgba(0, 182, 155, 1)"
                  : "rgba(249, 60, 101, 1)",
              }}
            >{`${Math.abs(difference)}% `}</span>
            <span className={styles.interval}>{isPositive ? `Up from ${interval}` : `Down from ${interval}`}</span>
          </span>
      </div>
    </div>
  );
};

export default Total;
