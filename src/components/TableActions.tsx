import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Plus, Target } from "lucide-react";

interface TableActionsProps {
  onAddClick: () => void;
}

const TableActions = ({ onAddClick }: TableActionsProps) => {
  const { isKipish } = useMode();

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${isKipish}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`font-display font-bold ${
              isKipish
                ? "text-xl sm:text-3xl uppercase tracking-widest neon-text glitch-text-loop text-primary"
                : "text-xl sm:text-2xl tracking-tight text-foreground"
            }`}
          >
            {isKipish ? "ДЕРЖИМ ИНДЕКС ЗА ЯЙЦА" : "Мониторинг индекса"}
          </motion.h2>
        </AnimatePresence>
        <p className={`text-xs text-muted-foreground mt-1 ${isKipish ? "font-display uppercase tracking-wider" : ""}`}>
          {isKipish ? "[ ЧЕ ТАМ ПО ИНДЕКСУ? ]" : "Отслеживайте расхождения цен между площадками"}
        </p>
      </div>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddClick}
        className={`hidden md:flex items-center gap-2 px-5 py-2.5 text-sm font-semibold transition-all ${
          isKipish
            ? "rounded-sm border border-primary bg-primary/20 uppercase tracking-wider text-primary neon-box"
            : "rounded-full bg-primary text-primary-foreground shadow-sm hover:shadow-md"
        }`}
      >
        {isKipish ? <Target className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        {isKipish ? "ВЗЯТЬ НА МУШКУ 🎯" : "Добавить товар"}
      </motion.button>
    </div>
  );
};

export default TableActions;
