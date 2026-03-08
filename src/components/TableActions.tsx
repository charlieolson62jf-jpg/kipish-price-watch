import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Plus, ShieldCheck, Target, Zap } from "lucide-react";

const TableActions = () => {
  const { isKipish } = useMode();

  const normalTexts = {
    title: "Мониторинг индекса цен",
    subtitle: "Отслеживайте расхождения цен между площадками",
    addBtn: "Добавить товар",
    protectBtn: "Активировать защиту (990₽/мес)",
  };

  const kipishTexts = {
    title: "ЧЕ ТАМ ПО ИНДЕКСУ?",
    subtitle: "[ СЛЕДИМ ЗА КАЖДЫМ ДВИЖЕНИЕМ ]",
    addBtn: "ВЗЯТЬ НА МУШКУ 🎯",
    protectBtn: "ВРУБИТЬ ЗАЩИТУ ⚡",
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
            className={`font-display text-2xl font-bold ${
              isKipish ? "uppercase tracking-widest neon-text" : "tracking-tight"
            }`}
          >
            {t.title}
          </motion.h2>
        </AnimatePresence>
        <p className={`text-sm text-muted-foreground ${isKipish ? "font-display uppercase tracking-wider" : ""}`}>
          {t.subtitle}
        </p>
      </div>
      <div className="flex gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all ${
            isKipish
              ? "rounded-none border border-primary bg-primary/20 uppercase tracking-wider text-primary neon-box"
              : "rounded-full bg-primary text-primary-foreground shadow-sm hover:shadow-md"
          }`}
        >
          {isKipish ? <Target className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {t.addBtn}
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 border px-4 py-2.5 text-sm font-semibold transition-all ${
            isKipish
              ? "rounded-none border-warning/50 bg-warning/10 uppercase tracking-wider text-warning"
              : "rounded-full border-border bg-card text-foreground hover:bg-accent"
          }`}
        >
          {isKipish ? <Zap className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
          {t.protectBtn}
        </motion.button>
      </div>
    </div>
  );
};

export default TableActions;
