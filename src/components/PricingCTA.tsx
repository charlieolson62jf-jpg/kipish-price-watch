import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Zap, ArrowRight } from "lucide-react";
import { useState } from "react";

const PricingCTA = () => {
  const { isKipish } = useMode();
  const [isPaid, setIsPaid] = useState(false);

  if (isPaid) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`mt-10 p-8 sm:p-10 text-center transition-all duration-500 ${
        isKipish
          ? "rounded-sm border border-border/20 bg-card noise-bg"
          : "rounded-[2rem] bg-card luxury-shadow"
      }`}
    >
      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.p
            key={`cta-text-${isKipish}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mb-6 ${
              isKipish
                ? "font-display text-sm uppercase tracking-[0.2em] text-foreground"
                : "font-display text-lg tracking-wide text-muted-foreground"
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
          onClick={() => setIsPaid(true)}
          className={`inline-flex items-center gap-2.5 px-8 sm:px-10 py-4 text-sm sm:text-base font-bold transition-all tracking-wide ${
            isKipish
              ? "rounded-sm border-2 border-warning bg-warning/10 backdrop-blur-md text-warning uppercase tracking-[0.15em] neon-yellow-blink"
              : "rounded-full border-2 border-foreground/80 bg-card text-foreground hover:bg-foreground hover:text-card"
          }`}
        >
          {isKipish ? <Zap className="h-5 w-5" /> : <ArrowRight className="h-4 w-4" />}
          {isKipish ? "ВРУБИТЬ ЗАЩИТУ — 990₽/МЕС" : "Активировать защиту — 990₽/мес"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default PricingCTA;
