import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import StatusBanner from "@/components/StatusBanner";
import TableActions from "@/components/TableActions";
import ProductRow from "@/components/ProductRow";

export interface Product {
  id: number;
  artWb: string;
  artOzon: string;
  priceWb: number;
  priceOzon: number;
  diff: number;
  status: "ok" | "alert";
}

export const mockProducts: Product[] = [
  { id: 1, artWb: "WB-284712", artOzon: "OZ-1847291", priceWb: 2490, priceOzon: 2490, diff: 0, status: "ok" },
  { id: 2, artWb: "WB-938471", artOzon: "OZ-7382910", priceWb: 1290, priceOzon: 1490, diff: 200, status: "ok" },
  { id: 3, artWb: "WB-571839", artOzon: "OZ-4829103", priceWb: 890, priceOzon: 1190, diff: -300, status: "alert" },
  { id: 4, artWb: "WB-129384", artOzon: "OZ-9381720", priceWb: 3990, priceOzon: 3990, diff: 0, status: "ok" },
  { id: 5, artWb: "WB-847291", artOzon: "OZ-2918374", priceWb: 799, priceOzon: 990, diff: -191, status: "alert" },
];

const ProductTable = () => {
  const { isKipish } = useMode();
  const hasAlert = mockProducts.some((p) => p.status === "alert");

  const headers = [
    { label: isKipish ? "ART WB" : "Артикул WB", align: "left" },
    { label: isKipish ? "ART OZON" : "Артикул Ozon", align: "left" },
    { label: isKipish ? "ЦЕНА WB" : "Цена WB", align: "right" },
    { label: isKipish ? "ЦЕНА OZON" : "Цена Ozon", align: "right" },
    { label: isKipish ? "DIFF" : "Разница", align: "right" },
    { label: isKipish ? "STATUS" : "Статус", align: "center" },
  ];

  return (
    <div className="container mx-auto px-6 py-8">
      <StatusBanner hasAlert={hasAlert} />
      <TableActions />

      {/* Table */}
      <motion.div
        layout
        className={`overflow-hidden border transition-all duration-500 ${
          isKipish
            ? "rounded-none border-border neon-box"
            : "rounded-2xl border-border shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className={`border-b border-border ${isKipish ? "bg-muted" : "bg-muted/40"}`}>
                {headers.map((h) => (
                  <th
                    key={h.label}
                    className={`px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground ${
                      h.align === "right" ? "text-right" : h.align === "center" ? "text-center" : "text-left"
                    }`}
                  >
                    {h.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product, i) => (
                <ProductRow key={product.id} product={product} index={i} />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductTable;
