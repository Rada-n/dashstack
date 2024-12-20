import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import {
  fetchDashboardData,
  DashboardData,
} from "../../../fetch/fetchDashboardData";
import { useDispatch } from "react-redux";
import { AppDispatch, AppState } from "../../../store/store";
import TotalSection from "../totalSection/TotalSection";
import SalesSection from "../salesSection/SalesSection";
import { DealsSection } from "../dealsSection/DealsSection";
import { motion } from "framer-motion";
import WeatherWidget from "../weatherWidget/WeatherWidget";
import Layout from "../../layout/Layout";

export const DashboardPage = () => {
  const { fetchDashboardData } = useActions();
  // const dispatch = useDispatch<AppDispatch>()
  const { dashboardData } = useSelector<AppState>(
    (state) => state.dashboardData
  );

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.5 },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, type: "ease" } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, type: "spring" },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Layout>
        <motion.h1 variants={titleVariants}>Dashboard</motion.h1>
        <motion.div variants={sectionVariants}>
          <TotalSection dashboardData={dashboardData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <SalesSection dashboardData={dashboardData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <DealsSection dashboardData={dashboardData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <WeatherWidget dashboardData={dashboardData} />
        </motion.div>
      </Layout>
    </motion.div>
  );
};
