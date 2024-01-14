// components/PageTransition.js
import { motion } from "framer-motion";

const fadeInVariants = {
  initial: {
    opacity: 0,
  },
  enter: {
    opacity: 1,
    transition: {
      duration: 0.8, // Adjust the duration as needed
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8, // Adjust the duration as needed
      ease: "easeInOut",
    },
  },
};

const PageTransition = ({ children }) => (
  <motion.div
    initial="initial"
    animate="enter"
    exit="exit"
    variants={fadeInVariants}
  >
    {children}
  </motion.div>
);

export default PageTransition;
