import React from "react";
import { DashboardData } from "../../../fetch/fetchDashboardData";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import styles from "./SalesSection.module.css";
import { Sales } from "../../../interfaces/dashboardData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const SalesSection: React.FC<{ dashboardData: DashboardData }> = ({
  dashboardData,
}) => {
  if (!dashboardData || !dashboardData[2]) {
    return
  }

  const labels: string[] = dashboardData[2].map((sale: Sales) => sale.date);
  const salesData: number[] = dashboardData[2].map((sale: Sales) => sale.total);
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "total sales",
        data: salesData,
        fill: false,
        tension: 0,
        borderColor: "rgba(67, 121, 238, 1)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(67, 121, 238, 1)",
      },
    },
  };

  return (
    <section className={styles.graphSection}>
      <h3 className={styles.title}>Sales Details</h3>
      <Line data={chartData} options={options} className={styles.lineChart} />
    </section>
  );
};

export default SalesSection;
