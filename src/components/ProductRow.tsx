import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { AlertTriangle, CheckCircle } from "lucide-react";
import type { Product } from "./ProductTable";

interface ProductRowProps {
  product: Product;
  index: number;
}

const ProductRow = ({ product, index }: ProductRowProps) => {
  const { isKipish } = useMode();

  return (
    <motion.tr
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`border-b border-border transition-colors last:border-0 ${
        product.status === "alert" && isKipish
          ? "bg-destructive/5"
          : "hover:bg-muted/30"
      }`}
    >
      <td className="px-5 py-4 font-mono text-sm">{product.artWb}</td>
      <td className="px-5 py-4 font-mono text-sm">{product.artOzon}</td>
      <td className="px-5 py-4 text-right text-sm font-medium">
        {product.priceWb.toLocaleString("ru-RU")} ₽
      </td>
      <td className="px-5 py-4 text-right text-sm font-medium">
        {product.priceOzon.toLocaleString("ru-RU")} ₽
      </td>
      <td
        className={`px-5 py-4 text-right text-sm font-bold ${
          product.diff === 0
            ? "text-muted-foreground"
            : product.diff < 0
              ? "text-destructive"
              : "text-success"
        }`}
      >
        {product.diff === 0 ? "—" : `${product.diff > 0 ? "+" : ""}${product.diff} ₽`}
      </td>
      <td className="px-5 py-4 text-center">
        <AnimatePresence mode="wait">
          {product.status === "ok" ? (
            <motion.span
              key={`ok-${isKipish}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${
                isKipish
                  ? "rounded-none border border-primary/30 bg-primary/20 uppercase tracking-wider text-primary"
                  : "rounded-full bg-success/10 text-success"
              }`}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              {isKipish ? "OK" : "Норма"}
            </motion.span>
          ) : (
            <motion.span
              key={`alert-${isKipish}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${
                isKipish
                  ? "rounded-none border border-destructive/30 bg-destructive/20 uppercase tracking-wider text-destructive blink-indicator neon-text-red"
                  : "rounded-full bg-destructive/10 text-destructive"
              }`}
            >
              <AlertTriangle className="h-3.5 w-3.5" />
              {isKipish ? "ШУХЕР!" : "Расхождение"}
            </motion.span>
          )}
        </AnimatePresence>
      </td>
    </motion.tr>
  );
};

export default ProductRow;
