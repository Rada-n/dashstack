import { useEffect } from "react";
import { useActions } from "../../../hooks/useActions";
import { useSelector } from "react-redux";
import { AppDispatch, AppState } from "../../../store/store";
import { motion } from "framer-motion";
import WeatherWidget from "../weatherWidget/WeatherWidget";
import Layout from "../../layout/Layout";
import DashboardSections from "../dashboardSections/DashboardSections";

export const DashboardPage = () => {
  const { fetchDashboardData } = useActions();
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


  return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Layout>
          <motion.h1 variants={titleVariants}>Dashboard</motion.h1>
          <DashboardSections dashboardData={dashboardData} />
          {/* <motion.div variants={sectionVariants}>
            <WeatherWidget dashboardData={dashboardData} />
          </motion.div> */}
        </Layout>
      </motion.div>
  );
};
