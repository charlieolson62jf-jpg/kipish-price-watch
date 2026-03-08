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
      transition={{ delay: index * 0.06 }}
      className={`transition-colors ${
        isKipish
          ? "border-b border-border/15"
          : ""
      } ${
        product.status === "alert" && isKipish
          ? "bg-destructive/5"
          : isKipish ? "hover:bg-muted/20" : "hover:bg-muted/20"
      }`}
    >
      <td className={`py-5 px-5 text-sm tracking-wide ${
        isKipish ? "font-mono text-secondary-foreground neon-text-pink" : "font-light text-muted-foreground"
      }`}>
        {product.artWb}
      </td>
      <td className={`py-5 px-5 text-sm tracking-wide ${
        isKipish ? "font-mono text-secondary-foreground neon-text-pink" : "font-light text-muted-foreground"
      }`}>
        {product.artOzon}
      </td>
      <td className={`py-5 px-5 text-right text-sm font-medium tracking-wide ${
        isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
      }`}>
        {product.priceWb.toLocaleString("ru-RU")} ₽
      </td>
      <td className={`py-5 px-5 text-right text-sm font-medium tracking-wide ${
        isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
      }`}>
        {product.priceOzon.toLocaleString("ru-RU")} ₽
      </td>
      <td className={`py-5 px-5 text-right text-sm font-semibold tracking-wide ${
        product.diff === 0
          ? "text-muted-foreground"
          : product.diff < 0
            ? "text-destructive"
            : "text-success"
      }`}>
        {product.diff === 0 ? "—" : `${product.diff > 0 ? "+" : ""}${product.diff} ₽`}
      </td>
      <td className="py-5 px-5 text-center">
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
      transition={{ delay: index * 0.06 }}
      className={`p-5 transition-all ${
        isKipish
          ? "rounded-sm border border-border/20 bg-card noise-bg"
          : "rounded-[2rem] bg-card luxury-shadow"
      } ${
        product.status === "alert" && isKipish ? "neon-border" : ""
      }`}
    >
      {/* Category + Status */}
      <div className="mb-4 flex items-center justify-between relative z-10">
        <span className={`text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground`}>
          {product.category}
        </span>
        <StatusBadge product={product} isKipish={isKipish} />
      </div>

      {/* WB vs Ozon side by side */}
      <div className="grid grid-cols-2 gap-3 relative z-10">
        <div className={`p-3.5 ${
          isKipish
            ? "rounded-sm bg-muted/20 border border-border/20"
            : "rounded-2xl bg-background/60"
        }`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1.5`}>
            {isKipish ? "WB" : "Wildberries"}
          </p>
          <p className={`text-xs mb-1 tracking-wide ${
            isKipish ? "font-mono text-secondary-foreground neon-text-pink" : "font-light text-muted-foreground"
          }`}>{product.artWb}</p>
          <p className={`text-lg font-semibold tracking-wide ${
            isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
          }`}>{product.priceWb.toLocaleString("ru-RU")} ₽</p>
        </div>
        <div className={`p-3.5 ${
          isKipish
            ? "rounded-sm bg-muted/20 border border-border/20"
            : "rounded-2xl bg-background/60"
        }`}>
          <p className={`text-[10px] font-semibold uppercase tracking-[0.15em] text-muted-foreground mb-1.5`}>
            {isKipish ? "OZON" : "Ozon"}
          </p>
          <p className={`text-xs mb-1 tracking-wide ${
            isKipish ? "font-mono text-secondary-foreground neon-text-pink" : "font-light text-muted-foreground"
          }`}>{product.artOzon}</p>
          <p className={`text-lg font-semibold tracking-wide ${
            isKipish ? "text-foreground neon-text-cyan" : "text-foreground"
          }`}>{product.priceOzon.toLocaleString("ru-RU")} ₽</p>
        </div>
      </div>

      {/* Diff */}
      <div className="mt-3.5 text-center relative z-10">
        <span className={`text-sm font-semibold tracking-wide ${
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
        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide ${
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
        className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium tracking-wide ${
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
