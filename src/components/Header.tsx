import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Shield, Zap } from "lucide-react";

const Header = () => {
  const { mode, setMode, isKipish } = useMode();

  return (
    <motion.header
      className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-xl"
      animate={{
        backgroundColor: isKipish ? "hsl(260 15% 10% / 0.9)" : "hsl(0 0% 100% / 0.8)",
      }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <motion.div className="flex items-center gap-3" layout>
          <AnimatePresence mode="wait">
            {isKipish ? (
              <motion.div
                key="kipish-logo"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Zap className="h-8 w-8 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="normal-logo"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <Shield className="h-8 w-8 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <h1 className="font-display text-xl font-bold tracking-tight text-foreground">
              <AnimatePresence mode="wait">
                {isKipish ? (
                  <motion.span
                    key="kipish-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="neon-text"
                  >
                    Ozon-КИПИШ
                  </motion.span>
                ) : (
                  <motion.span
                    key="normal-title"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    Ozon-Кипиш
                  </motion.span>
                )}
              </AnimatePresence>
            </h1>
            <p className="text-xs text-muted-foreground">
              {isKipish ? "Держим индекс за яйца" : "Мониторинг индекса цен"}
            </p>
          </div>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-3">
          <span className={`text-sm font-medium ${!isKipish ? 'text-foreground' : 'text-muted-foreground'}`}>
            Обычный
          </span>
          <button
            onClick={() => setMode(isKipish ? "normal" : "kipish")}
            className="relative h-10 w-20 rounded-full border-2 transition-colors duration-300"
            style={{
              borderColor: isKipish ? "hsl(270 100% 60%)" : "hsl(220 13% 80%)",
              backgroundColor: isKipish ? "hsl(270 100% 15%)" : "hsl(220 15% 94%)",
              boxShadow: isKipish ? "0 0 15px hsl(270 100% 60% / 0.4)" : "none",
            }}
          >
            <motion.div
              className="absolute top-1 h-6 w-6 rounded-full"
              animate={{
                left: isKipish ? "calc(100% - 28px)" : "4px",
                backgroundColor: isKipish ? "hsl(270, 100%, 60%)" : "hsl(230, 60%, 50%)",
                boxShadow: isKipish
                  ? "0 0 12px hsl(270 100% 60% / 0.8)"
                  : "0 1px 3px hsl(0 0% 0% / 0.2)",
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
          <AnimatePresence mode="wait">
            <motion.span
              key={mode}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className={`text-sm font-bold font-display ${isKipish ? 'neon-text text-primary' : 'text-muted-foreground'}`}
            >
              КИПИШ
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Auth placeholder */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-lg border border-border bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent"
        >
          Войти
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
