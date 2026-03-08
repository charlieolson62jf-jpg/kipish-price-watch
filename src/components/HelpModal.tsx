import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { X, Crosshair, Send, Wine } from "lucide-react";

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const steps = [
  {
    icon: Crosshair,
    normal: "Добавьте артикулы WB и Ozon для мониторинга",
    kipish: "ЗАБЕЙ АРТИКУЛ ВРАГА 🎯",
  },
  {
    icon: Send,
    normal: "Подключите Telegram-бота для уведомлений",
    kipish: "ПОДЦЕПИ СВОЮ ТЕЛЕГУ 📱",
  },
  {
    icon: Wine,
    normal: "Расслабьтесь — бот следит за ценами 24/7",
    kipish: "ИДИ ПЕЙ ПРОСЕККО, ПОКА Я ПАСУ ТВОИ МИЛЛИОНЫ 🥂",
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full max-w-md p-7 ${
              isKipish
                ? "rounded-sm border border-primary/30 bg-card noise-bg neon-box"
                : "rounded-[2rem] bg-card luxury-shadow border border-border/30"
            }`}
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className={`font-display font-bold text-xl mb-7 ${
              isKipish ? "uppercase tracking-[0.15em] text-primary neon-text" : "tracking-wide text-foreground"
            }`}>
              {isKipish ? "КАК ЭТО РАБОТАЕТ?" : "Как это работает"}
            </h3>

            <div className="space-y-6 relative z-10">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`flex h-11 w-11 shrink-0 items-center justify-center ${
                      isKipish
                        ? "rounded-sm border border-primary/30 bg-primary/10"
                        : "rounded-2xl bg-muted/60"
                    }`}>
                      <Icon className={`h-5 w-5 ${isKipish ? "text-primary" : "text-foreground"}`} />
                    </div>
                    <div className="pt-2.5">
                      <p className={`text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-1`}>
                        {isKipish ? `ШАГ ${i + 1}` : `Шаг ${i + 1}`}
                      </p>
                      <p className={`text-sm ${
                        isKipish ? "text-foreground uppercase tracking-wider font-medium" : "font-light tracking-wide text-foreground"
                      }`}>
                        {isKipish ? step.kipish : step.normal}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HelpModal;
