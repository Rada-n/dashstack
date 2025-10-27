import React from 'react'
import { motion } from "framer-motion";
import TotalSection from '../totalSection/TotalSection';
import SalesSection from '../salesSection/SalesSection';
import { DealsSection } from '../dealsSection/DealsSection';
import Loading from '../../loading/Loading';

const DashboardSections = ({ dashboardData }) => {
    if (!dashboardData || !dashboardData[0] || !dashboardData[1]) {
        return <Loading />
    }
    
  const sectionVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, type: "spring" },
    },
  };
  return (
    <>
      <motion.div variants={sectionVariants}>
          <TotalSection dashboardData={dashboardData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <SalesSection dashboardData={dashboardData} />
        </motion.div>
        <motion.div variants={sectionVariants}>
          <DealsSection dashboardData={dashboardData} />
        </motion.div>
    </>
  )
}

export default DashboardSections
