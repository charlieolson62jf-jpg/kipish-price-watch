import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { mockProducts } from "./ProductTable";

interface StatusBannerProps {
  hasAlert: boolean;
}

const StatusBanner = ({ hasAlert }: StatusBannerProps) => {
  const { isKipish } = useMode();

  const normalTexts = {
    statusOk: "Все показатели в норме",
    statusAlert: "Обнаружено расхождение цен",
  };

  const kipishTexts = {
    statusOk: "ВСЁ ЧЁТКО, ОЗОН СПИТ 😴",
    statusAlert: "🚨 ШУХЕР! НА ВБ ДЕШЕВЛЕ! ИСПРАВЛЯЙ, ПОКА НЕ ПРИЛЕТЕЛО!",
  };

  const t = isKipish ? kipishTexts : normalTexts;
  const alertCount = mockProducts.filter((p) => p.status === "alert").length;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${isKipish}-${hasAlert}`}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className={`mb-8 border p-6 transition-all duration-500 ${
          isKipish ? "rounded-none" : "rounded-2xl"
        } ${
          hasAlert
            ? isKipish
              ? "border-destructive neon-border bg-destructive/10"
              : "border-destructive/20 bg-destructive/5"
            : isKipish
              ? "border-primary neon-border bg-primary/10"
              : "border-success/20 bg-success/5"
        }`}
      >
        <div className="flex items-center gap-3">
          {hasAlert ? (
            <AlertTriangle
              className={`h-6 w-6 ${
                isKipish ? "text-destructive blink-indicator" : "text-destructive"
              }`}
            />
          ) : (
            <CheckCircle className={`h-6 w-6 ${isKipish ? "text-primary" : "text-success"}`} />
          )}
          <div>
            <h2
              className={`font-display font-bold ${
                isKipish ? "text-lg uppercase tracking-wider" : "text-base"
              } ${hasAlert && isKipish ? "neon-text-red text-destructive" : ""}`}
            >
              {hasAlert ? t.statusAlert : t.statusOk}
            </h2>
            <p className="text-sm text-muted-foreground">
              {alertCount} из {mockProducts.length}{" "}
              {isKipish ? "ПОЗИЦИЙ ГОРЯТ" : "товаров требуют внимания"}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StatusBanner;
