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
      className={`border-b border-border transition-colors last:border-0 hidden md:table-row ${
        product.status === "alert" && isKipish
          ? "bg-destructive/5"
          : "hover:bg-muted/30"
      }`}
    >
      <td className="px-5 py-4 font-mono text-sm text-foreground">{product.artWb}</td>
      <td className="px-5 py-4 font-mono text-sm text-foreground">{product.artOzon}</td>
      <td className="px-5 py-4 text-right text-sm font-medium text-foreground">
        {product.priceWb.toLocaleString("ru-RU")} ₽
      </td>
      <td className="px-5 py-4 text-right text-sm font-medium text-foreground">
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
        <StatusBadge product={product} isKipish={isKipish} />
      </td>
    </motion.tr>
  );
};

export const ProductCard = ({ product, index }: ProductRowProps) => {
  const { isKipish } = useMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`border border-border p-4 transition-all md:hidden ${
        isKipish ? "rounded-none" : "rounded-2xl"
      } ${
        product.status === "alert" && isKipish
          ? "bg-destructive/5 neon-border"
          : "bg-card"
      }`}
    >
      {/* Status badge centered */}
      <div className="mb-3 flex justify-center">
        <StatusBadge product={product} isKipish={isKipish} />
      </div>

      {/* WB vs Ozon side by side */}
      <div className="grid grid-cols-2 gap-3">
        <div className={`border border-border p-3 ${isKipish ? "rounded-none bg-muted/30" : "rounded-xl bg-muted/20"}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {isKipish ? "WB" : "Wildberries"}
          </p>
          <p className="font-mono text-xs text-foreground mb-1">{product.artWb}</p>
          <p className="text-lg font-bold text-foreground">{product.priceWb.toLocaleString("ru-RU")} ₽</p>
        </div>
        <div className={`border border-border p-3 ${isKipish ? "rounded-none bg-muted/30" : "rounded-xl bg-muted/20"}`}>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {isKipish ? "OZON" : "Ozon"}
          </p>
          <p className="font-mono text-xs text-foreground mb-1">{product.artOzon}</p>
          <p className="text-lg font-bold text-foreground">{product.priceOzon.toLocaleString("ru-RU")} ₽</p>
        </div>
      </div>

      {/* Diff */}
      <div className="mt-3 text-center">
        <span className={`text-sm font-bold ${
          product.diff === 0
            ? "text-muted-foreground"
            : product.diff < 0
              ? "text-destructive"
              : "text-success"
        }`}>
          {isKipish ? "DIFF: " : "Разница: "}
          {product.diff === 0 ? "—" : `${product.diff > 0 ? "+" : ""}${product.diff} ₽`}
        </span>
      </div>
    </motion.div>
  );
};

const StatusBadge = ({ product, isKipish }: { product: Product; isKipish: boolean }) => (
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
);

export default ProductRow;
