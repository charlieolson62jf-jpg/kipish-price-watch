import { motion } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Plus, Target } from "lucide-react";
import { useState } from "react";
import StatusBanner from "@/components/StatusBanner";
import TableActions from "@/components/TableActions";
import ProductRow, { ProductCard } from "@/components/ProductRow";
import AddProductModal from "@/components/AddProductModal";
import CategoryTabs from "@/components/CategoryTabs";
import PricingCTA from "@/components/PricingCTA";

export interface Product {
  id: number;
  artWb: string;
  artOzon: string;
  priceWb: number;
  priceOzon: number;
  diff: number;
  status: "ok" | "alert";
  category: string;
}

export const mockProducts: Product[] = [
  { id: 1, artWb: "WB-284712", artOzon: "OZ-1847291", priceWb: 2490, priceOzon: 2490, diff: 0, status: "ok", category: "Электроника" },
  { id: 2, artWb: "WB-938471", artOzon: "OZ-7382910", priceWb: 1290, priceOzon: 1490, diff: 200, status: "ok", category: "Дом" },
  { id: 3, artWb: "WB-571839", artOzon: "OZ-4829103", priceWb: 890, priceOzon: 1190, diff: -300, status: "alert", category: "Одежда" },
];

const categories = ["Все", "Электроника", "Дом", "Одежда"];

const ProductTable = () => {
  const { isKipish } = useMode();
  const [addOpen, setAddOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = activeCategory === "Все"
    ? mockProducts
    : mockProducts.filter((p) => p.category === activeCategory);

  const hasAlert = filtered.some((p) => p.status === "alert");

  const headers = [
    { label: isKipish ? "ART WB" : "Артикул WB", align: "left" },
    { label: isKipish ? "ART OZON" : "Артикул Ozon", align: "left" },
    { label: isKipish ? "ЦЕНА WB" : "Цена WB", align: "right" },
    { label: isKipish ? "ЦЕНА OZON" : "Цена Ozon", align: "right" },
    { label: isKipish ? "DIFF" : "Разница", align: "right" },
    { label: isKipish ? "STATUS" : "Статус", align: "center" },
  ];

  return (
    <div className="container mx-auto px-5 sm:px-8 lg:px-12 py-10 pb-28 md:pb-14">
      <StatusBanner hasAlert={hasAlert} />
      <TableActions onAddClick={() => setAddOpen(true)} />

      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Desktop Table — no borders in normal mode */}
      <motion.div
        layout
        className={`overflow-hidden transition-all duration-500 hidden md:block ${
          isKipish
            ? "rounded-sm noise-bg"
            : "rounded-[2rem] bg-card luxury-shadow"
        }`}
      >
        <div className="overflow-x-auto relative z-10">
          <table className="w-full">
            <thead>
              <tr className={isKipish ? "border-b border-border/20" : ""}>
                {headers.map((h) => (
                  <th
                    key={h.label}
                    className={`px-5 py-4 text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground ${
                      h.align === "right" ? "text-right" : h.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((product, i) => (
                <ProductRow key={product.id} product={product} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Mobile Cards */}
      <div className="flex flex-col gap-5 md:hidden">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Pricing CTA */}
      <PricingCTA />

      {/* FAB for mobile */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setAddOpen(true)}
        className={`fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center shadow-xl md:hidden ${
          isKipish
            ? "rounded-sm border border-primary bg-primary/20 neon-box glow-pulse"
            : "rounded-full bg-foreground text-card luxury-shadow"
        }`}
      >
        {isKipish ? <Target className="h-6 w-6 text-primary" /> : <Plus className="h-6 w-6" />}
      </motion.button>

      <AddProductModal open={addOpen} onClose={() => setAddOpen(false)} />
    </div>
  );
};

export default ProductTable;
