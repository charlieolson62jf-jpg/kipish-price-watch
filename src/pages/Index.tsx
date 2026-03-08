import { motion } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import Header from "@/components/Header";
import ProductTable from "@/components/ProductTable";

const Index = () => {
  const { isKipish } = useMode();

  // Check if any product has alert status for the red pulse effect
  const hasAlert = true; // In real app, derive from data

  return (
    <motion.div
      className={`min-h-screen bg-background transition-colors duration-500 ${
        isKipish && hasAlert ? "pulse-red-alert" : ""
      }`}
      animate={{
        backgroundColor: isKipish ? "hsl(260, 10%, 6%)" : "hsl(220, 25%, 97%)",
      }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <ProductTable />
    </motion.div>
  );
};

export default Index;
