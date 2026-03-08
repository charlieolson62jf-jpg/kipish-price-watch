import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { X, CreditCard, Zap } from "lucide-react";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
}

const PaymentModal = ({ open, onClose }: PaymentModalProps) => {
  const { isKipish } = useMode();

  const handlePay = () => {
    // Placeholder — will connect to YooKassa / SBP
    console.log("Payment initiated");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full max-w-sm p-8 sm:p-10 ${
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

            {/* Icon */}
            <div className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center ${
              isKipish
                ? "rounded-sm border border-warning/30 bg-warning/10"
                : "rounded-full bg-muted"
            }`}>
              {isKipish
                ? <Zap className="h-7 w-7 text-warning" />
                : <CreditCard className="h-7 w-7 text-foreground" />
              }
            </div>

            <h3
              className={`font-display font-bold text-xl mb-3 text-center ${
                isKipish
                  ? "uppercase tracking-[0.15em] text-primary neon-text"
                  : "tracking-wide text-foreground"
              }`}
            >
              {isKipish ? "ОФОРМИТЬ ПОДПИСКУ" : "Оформить подписку"}
            </h3>

            <p className={`text-center mb-8 ${
              isKipish
                ? "text-xs uppercase tracking-[0.12em] text-muted-foreground"
                : "text-sm font-light tracking-wide text-muted-foreground"
            }`}>
              {isKipish
                ? "ДОСТУП КО ВСЕМ ФУНКЦИЯМ НА 30 ДНЕЙ — 990₽"
                : "Доступ ко всем функциям на 30 дней — 990₽"}
            </p>

            {/* Features */}
            <div className={`mb-8 space-y-3 ${
              isKipish ? "text-xs" : "text-sm font-light"
            }`}>
              {[
                isKipish ? "МОНИТОРИНГ 24/7" : "Мониторинг цен 24/7",
                isKipish ? "УВЕДОМЛЕНИЯ В ТЕЛЕГУ" : "Уведомления в Telegram",
                isKipish ? "БЕЗЛИМИТ ТОВАРОВ" : "Безлимит отслеживаемых товаров",
              ].map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <div className={`h-1.5 w-1.5 shrink-0 ${
                    isKipish
                      ? "rounded-sm bg-warning"
                      : "rounded-full bg-foreground/30"
                  }`} />
                  <span className={`tracking-wide ${
                    isKipish ? "text-secondary-foreground uppercase" : "text-muted-foreground"
                  }`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePay}
              className={`w-full flex items-center justify-center gap-2.5 py-4 font-bold text-sm transition-all tracking-wide ${
                isKipish
                  ? "rounded-sm border-2 border-warning/60 bg-warning/10 backdrop-blur-md text-warning uppercase tracking-[0.15em] neon-yellow-blink"
                  : "rounded-2xl border-2 border-foreground/80 bg-card text-foreground hover:bg-foreground hover:text-card"
              }`}
            >
              {isKipish ? <Zap className="h-5 w-5" /> : <CreditCard className="h-4 w-4" />}
              {isKipish ? "ОПЛАТИТЬ (ЮKASSA / СБП)" : "Оплатить (ЮKassa / СБП)"}
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
