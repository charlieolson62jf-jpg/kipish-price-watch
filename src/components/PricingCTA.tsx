import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Zap, ShieldCheck } from "lucide-react";

const PricingCTA = () => {
  const { isKipish } = useMode();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`mt-8 p-6 sm:p-8 text-center transition-all duration-500 ${
        isKipish
          ? "rounded-sm border border-border/30 bg-card noise-bg"
          : "rounded-[2rem] glass shadow-sm"
      }`}
    >
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={`cta-text-${isKipish}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`text-sm sm:text-base mb-5 ${
              isKipish
                ? "font-display uppercase tracking-wider text-foreground"
                : "text-muted-foreground"
            }`}
          >
            {isKipish
              ? "НЕ ТУПИ! 3 ДНЯ НА ШАРУ, ПОТОМ 990₽. ОЗОН НЕ ЖДЁТ!"
              : "Попробуйте 3 дня бесплатно, далее 990₽/мес"}
          </motion.p>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-extrabold transition-all pulse-cta-yellow ${
            isKipish
              ? "rounded-sm bg-warning text-warning-foreground uppercase tracking-wider border border-warning/60"
              : "rounded-full bg-warning text-warning-foreground shadow-lg"
          }`}
        >
          {isKipish ? <Zap className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
          ВРУБИТЬ ЗАЩИТУ — 990₽/МЕС
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCTA;
