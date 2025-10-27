import Total from "../total/Total";
import TotalUser from "../../../assets/dashboard/TotalUser.svg";
import TotalOrder from "../../../assets/dashboard/TotalOrder.svg";
import TotalSales from "../../../assets/dashboard/TotalSales.svg";
import TotalPending from "../../../assets/dashboard/TotalPending.svg";
import { Orders, Users } from "../../../interfaces/dashboardData";
import { DashboardData } from "../../../fetch/fetchDashboardData";
import styles from "./TotalSection.module.css";
import Loading from "../../loading/Loading";

const TotalSection: React.FC<{dashboardData: DashboardData}> = ({ dashboardData }) => {

  const amountSumDelivered = (currentStatus: string): number => {
    const amount = dashboardData[1].data.reduce((acc: number, cur: Orders) => {
      if (cur.status.toLowerCase() === currentStatus.toLowerCase()) {
          acc += Number(cur.amount) || 0
      }
      return acc;
    }, 0);

    return amount
  };

  const amountPending = (): number => {
    let count = 0;
    dashboardData[1].data.forEach((order: Orders) => {
      if (order.status === "Processing") {
        count++;
      }
    });
    return count;
  };

  const sortedOrders: Orders[] = [...dashboardData[1].data].sort(
    (a: Orders, b: Orders) => new Date(a.date) - new Date(b.date)
  )

  const differenceUser = (): number => {
    const sortedUsers: Users[] = [...dashboardData[0].data].sort(
        (a: Users, b: Users) => new Date(a.date) - new Date(b.date)
      )
    const today = sortedUsers[0].date;
    const yesterday = sortedUsers[1].date;
    const countToday = sortedUsers.filter((user: Users) => user.date === today);
    const countYesterday = sortedUsers.filter(
      (user: Users) => user.date === yesterday
    );
    return +(countToday.length / countYesterday.length).toFixed(1)
  };


  const differenceOrders = (): number => {
    const weekFirstStarts = new Date(sortedOrders[0].date)
    const weekFirstEnds = new Date(weekFirstStarts).setDate(weekFirstStarts.getDate() + 7)
    const weekSecondStarts = new Date(weekFirstEnds)
    const weekSecondEnds = new Date(weekFirstStarts).setDate(weekSecondStarts.getDate() + 7)

    const countWeekFirst = sortedOrders.filter((order: Orders) => {
        const orderDate = new Date(order.date)
        return orderDate >= weekFirstStarts && orderDate < weekFirstEnds && order.status !== 'Rejected'
    }).length

    const countWeekSecond = sortedOrders.filter((order: Orders) => {
        const orderDate = new Date(order.date)
        return orderDate >= weekSecondStarts && orderDate < weekSecondEnds && order.status !== 'Rejected'
    }).length

    return countWeekSecond === 0 ? 0 : +(countWeekFirst / countWeekSecond).toFixed(1);
  }

  const differenceSales = (typeOfOrder: string): number => {
    const deliveredOrders = sortedOrders.filter((order: Orders) =>
        order.status === typeOfOrder
    ).sort()
    const uniqueDates = [...new Set(deliveredOrders.map(order => new Date(order.date).toDateString()))]
    const firstDay = uniqueDates[0]
    const secondDay = uniqueDates[1]
    const firstDayCount = deliveredOrders.filter((order: Orders) => new Date(order.date).toDateString() === firstDay).length
    const secondDayCount = deliveredOrders.filter((order: Orders) => new Date(order.date).toDateString() === secondDay).length
    return +(firstDayCount / secondDayCount).toFixed(1)
  }

  return (
    <section className={styles.totalSection}>
      <Total
        name={"User"}
        color={"rgba(130, 128, 255, 0.3"}
        image={TotalUser}
        amount={dashboardData[0].data.length}
        difference={differenceUser()}
        interval={'yesterday'}
      />
      <Total
        name={"Order"}
        color={"rgba(254, 197, 61, 0.3"}
        image={TotalOrder}
        amount={dashboardData[1].data.length}
        difference={differenceOrders()}
        interval={'past week'}
      />
      <Total
        name={"Sales"}
        color={"rgba(74, 217, 145, 0.3"}
        image={TotalSales}
        amount={`$${amountSumDelivered("Completed")}`}
        difference={differenceSales("Completed")}
        interval={'yesterday'}
      />
      <Total
        name={"Pending"}
        color={"rgba(255, 144, 102, 0.3"}
        image={TotalPending}
        amount={amountPending()}
        difference={differenceSales("Processing")}
        interval={'yesterday'}
      />
    </section>
  );
};

export default TotalSection;
