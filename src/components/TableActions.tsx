import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Plus, ShieldCheck, Target, Zap } from "lucide-react";

interface TableActionsProps {
  onAddClick: () => void;
}

const TableActions = ({ onAddClick }: TableActionsProps) => {
  const { isKipish } = useMode();

  const normalTexts = {
    title: "Мониторинг индекса цен",
    subtitle: "Отслеживайте расхождения цен между площадками",
    addBtn: "Добавить товар",
    protectBtn: "Активировать защиту — 990₽/мес",
  };

  const kipishTexts = {
    title: "ЧЕ ТАМ ПО ИНДЕКСУ?",
    subtitle: "[ СЛЕДИМ ЗА КАЖДЫМ ДВИЖЕНИЕМ ]",
    addBtn: "ВЗЯТЬ НА МУШКУ 🎯",
    protectBtn: "ВРУБИТЬ ЗАЩИТУ — 990₽/МЕС ⚡",
  };

  const t = isKipish ? kipishTexts : normalTexts;

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <AnimatePresence mode="wait">
          <motion.h2
            key={`title-${isKipish}`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`font-display text-xl sm:text-2xl font-bold ${
              isKipish ? "uppercase tracking-widest neon-text text-primary" : "tracking-tight text-foreground"
            }`}
          >
            {t.title}
          </motion.h2>
        </AnimatePresence>
        <p className={`text-xs text-muted-foreground mt-1 ${isKipish ? "font-display uppercase tracking-wider" : ""}`}>
          {t.subtitle}
        </p>
      </div>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onAddClick}
          className={`hidden md:flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all ${
            isKipish
              ? "rounded-sm border border-primary bg-primary/20 uppercase tracking-wider text-primary neon-box"
              : "rounded-full bg-primary text-primary-foreground shadow-sm hover:shadow-md"
          }`}
        >
          {isKipish ? <Target className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {t.addBtn}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2.5 font-bold transition-all ${
            isKipish
              ? "rounded-sm border border-primary/50 bg-primary/10 uppercase tracking-wider text-primary text-sm glow-pulse"
              : "rounded-full border border-border bg-card text-foreground hover:bg-accent text-xs sm:text-sm"
          }`}
        >
          {isKipish ? <Zap className="h-5 w-5" /> : <ShieldCheck className="h-4 w-4" />}
          {t.protectBtn}
        </motion.button>
      </div>
    </div>
  );
};

export default TableActions;
