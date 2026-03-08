import { useMode } from "@/contexts/ModeContext";
import Header from "@/components/Header";
import ProductTable from "@/components/ProductTable";

const Index = () => {
  const { isKipish } = useMode();

  return (
    <div
      className={`min-h-screen bg-background transition-colors duration-500 ${
        isKipish ? "pulse-red-alert noise-bg" : ""
      }`}
    >
      <Header />
      <ProductTable />
    </div>
  );
};

export default Index;
