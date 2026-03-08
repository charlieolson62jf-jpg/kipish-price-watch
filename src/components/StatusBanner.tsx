import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { mockProducts } from "./ProductTable";

interface StatusBannerProps {
  hasAlert: boolean;
}

const StatusBanner = ({ hasAlert }: StatusBannerProps) => {
  const { isKipish } = useMode();
  const alertCount = mockProducts.filter((p) => p.status === "alert").length;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${isKipish}-${hasAlert}`}
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.4 }}
        className={`mb-8 p-5 sm:p-6 transition-all duration-500 ${
          isKipish ? "rounded-sm" : "rounded-[2rem]"
        } ${
          hasAlert
            ? isKipish
              ? "border border-destructive/40 bg-destructive/5 noise-bg"
              : "bg-card luxury-shadow border border-destructive/10"
            : isKipish
              ? "border border-success/30 bg-success/5 noise-bg"
              : "bg-card luxury-shadow border border-success/10"
        }`}
      >
        <div className="flex items-center gap-3 relative z-10">
          {hasAlert ? (
            <AlertTriangle className={`h-5 w-5 ${
              isKipish ? "text-destructive blink-indicator" : "text-destructive"
            }`} />
          ) : (
            <CheckCircle className="h-5 w-5 text-success" />
          )}
          <div>
            <h2 className={`font-display font-bold ${
              isKipish ? "text-base uppercase tracking-[0.15em]" : "text-base tracking-wide"
            } ${hasAlert && isKipish ? "neon-text-red text-destructive" : "text-foreground"}`}>
              {hasAlert
                ? isKipish
                  ? "🚨 ШУХЕР! НА ВБ ДЕШЕВЛЕ! ИСПРАВЛЯЙ!"
                  : "Обнаружено расхождение цен"
                : isKipish
                  ? "ВСЁ ЧЁТКО, ОЗОН СПИТ 😴"
                  : "Показатели в норме"}
            </h2>
            <p className={`text-xs text-muted-foreground mt-0.5 tracking-wide ${
              isKipish ? "uppercase" : "font-light"
            }`}>
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
