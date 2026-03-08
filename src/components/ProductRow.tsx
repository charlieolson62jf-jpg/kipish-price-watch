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
      className={`transition-colors ${
        isKipish ? "border-b border-border/20" : "border-b border-border/40"
      } ${
        product.status === "alert" && isKipish
          ? "bg-destructive/5"
          : isKipish ? "hover:bg-muted/20" : "hover:bg-muted/30"
      }`}
    >
      {/* Articulы — lavender in kipish */}
      <td className={`px-5 py-4 font-mono text-sm ${
        isKipish ? "text-secondary-foreground neon-text-pink" : "text-foreground"
      }`}>
        {product.artWb}
      </td>
      <td className={`px-5 py-4 font-mono text-sm ${
        isKipish ? "text-secondary-foreground neon-text-pink" : "text-foreground"
      }`}>
        {product.artOzon}
      </td>
      {/* Prices — cyan neon in kipish */}
      <td className={`px-5 py-4 text-right text-sm font-semibold ${
        isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
      }`}>
        {product.priceWb.toLocaleString("ru-RU")} ₽
      </td>
      <td className={`px-5 py-4 text-right text-sm font-semibold ${
        isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
      }`}>
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
      className={`p-4 transition-all ${
        isKipish
          ? "rounded-sm border border-border/20 bg-card noise-bg"
          : "rounded-[1.5rem] glass shadow-sm"
      } ${
        product.status === "alert" && isKipish ? "neon-border" : ""
      }`}
    >
      {/* Category + Status */}
      <div className="mb-3 flex items-center justify-between relative z-10">
        <span className={`text-[10px] font-semibold uppercase tracking-wider ${
          isKipish ? "text-muted-foreground" : "text-muted-foreground"
        }`}>
          {product.category}
        </span>
        <StatusBadge product={product} isKipish={isKipish} />
      </div>

      {/* WB vs Ozon side by side */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className={`p-3 ${
          isKipish
            ? "rounded-sm bg-muted/20 border border-border/20"
            : "rounded-2xl bg-muted/40"
        }`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {isKipish ? "WB" : "Wildberries"}
          </p>
          <p className={`font-mono text-xs mb-1 ${
            isKipish ? "text-secondary-foreground neon-text-pink" : "text-muted-foreground"
          }`}>{product.artWb}</p>
          <p className={`text-lg font-bold ${
            isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
          }`}>{product.priceWb.toLocaleString("ru-RU")} ₽</p>
        </div>
        <div className={`p-3 ${
          isKipish
            ? "rounded-sm bg-muted/20 border border-border/20"
            : "rounded-2xl bg-muted/40"
        }`}>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            {isKipish ? "OZON" : "Ozon"}
          </p>
          <p className={`font-mono text-xs mb-1 ${
            isKipish ? "text-secondary-foreground neon-text-pink" : "text-muted-foreground"
          }`}>{product.artOzon}</p>
          <p className={`text-lg font-bold ${
            isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
          }`}>{product.priceOzon.toLocaleString("ru-RU")} ₽</p>
        </div>
      </div>

      {/* Diff */}
      <div className="mt-3 text-center relative z-10">
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
            ? "rounded-sm border border-success/30 bg-success/10 uppercase tracking-wider text-success"
            : "rounded-full bg-success/10 text-success"
        }`}
      >
        <CheckCircle className="h-3.5 w-3.5" />
        {isKipish ? "ЧЁТКО" : "Норма"}
      </motion.span>
    ) : (
      <motion.span
        key={`alert-${isKipish}`}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold ${
          isKipish
            ? "rounded-sm border border-destructive/30 bg-destructive/10 uppercase tracking-wider text-destructive blink-indicator neon-text-red"
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
