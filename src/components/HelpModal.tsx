import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { X, Plus, Send, Moon } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Plus,
    normal: "Добавьте артикулы WB и Ozon",
    kipish: "ЗАКИНЬ АРТИКУЛЫ",
  },
  {
    icon: Send,
    normal: "Подключите Telegram-бота",
    kipish: "ПОДРУБИ ТЕЛЕГУ",
  },
  {
    icon: Moon,
    normal: "Спите спокойно — бот следит за ценами",
    kipish: "СПИ СПОКОЙНО, БОТ ВСЁ ПАЛИТ 🔫",
  },
];

const HelpModal = ({ open, onClose }: HelpModalProps) => {
  const { isKipish } = useMode();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full max-w-md p-6 ${
              isKipish
                ? "rounded-sm border border-primary/30 bg-card noise-bg neon-box"
                : "rounded-2xl glass shadow-xl border border-border/50"
            }`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className={`font-display font-bold text-lg mb-6 ${
              isKipish ? "uppercase tracking-wider text-primary neon-text" : "text-foreground"
            }`}>
              {isKipish ? "КАК ЭТО РАБОТАЕТ?" : "Как это работает?"}
            </h3>

            <div className="space-y-5">
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center text-sm font-bold ${
                    isKipish
                      ? "rounded-sm border border-primary/30 bg-primary/10 text-primary"
                      : "rounded-xl bg-primary/10 text-primary"
                  }`}>
                    {i + 1}
                  </div>
                  <div>
                    <p className={`text-sm font-medium ${
                      isKipish ? "text-foreground" : "text-foreground"
                    }`}>
                      {isKipish ? step.kipish : step.normal}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpModal;
