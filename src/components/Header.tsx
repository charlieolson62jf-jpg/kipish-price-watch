import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Shield, Zap } from "lucide-react";

const Header = () => {
  const { mode, setMode, isKipish } = useMode();

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b border-border backdrop-blur-xl transition-all duration-500 ${
        isKipish ? "bg-card/95" : "bg-card/70"
      }`}
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
                className="flex h-10 w-10 items-center justify-center rounded-none border border-primary neon-box"
              >
                <Zap className="h-5 w-5 text-primary" />
              </motion.div>
            ) : (
              <motion.div
                key="normal-logo"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10"
              >
                <Shield className="h-5 w-5 text-primary" />
              </motion.div>
            )}
          </AnimatePresence>
          <div>
            <AnimatePresence mode="wait">
              {isKipish ? (
                <motion.h1
                  key="kipish-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-display text-xl font-bold uppercase tracking-widest text-primary neon-text"
                >
                  OZON-КИПИШ
                </motion.h1>
              ) : (
                <motion.h1
                  key="normal-title"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="font-display text-xl font-semibold tracking-tight text-foreground"
                >
                  Index Guard
                </motion.h1>
              )}
            </AnimatePresence>
            <p className="text-xs text-muted-foreground">
              {isKipish ? "[ ДЕРЖИМ ИНДЕКС ЗА ЯЙЦА ]" : "Price index monitoring"}
            </p>
          </div>
        </motion.div>

        {/* Mode Toggle */}
        <div className="flex items-center gap-3">
          <span className={`text-sm transition-colors ${!isKipish ? "font-medium text-foreground" : "text-muted-foreground"}`}>
            Обычный
          </span>
          <button
            onClick={() => setMode(isKipish ? "normal" : "kipish")}
            className={`relative h-10 w-20 border-2 transition-all duration-300 ${
              isKipish
                ? "rounded-none border-primary neon-box"
                : "rounded-full border-border"
            }`}
            style={{
              backgroundColor: isKipish ? "hsl(270 100% 10%)" : "hsl(220 14% 96%)",
            }}
          >
            <motion.div
              className={`absolute top-1 h-6 w-6 ${isKipish ? "rounded-none" : "rounded-full"}`}
              animate={{
                left: isKipish ? "calc(100% - 28px)" : "4px",
                backgroundColor: isKipish ? "hsl(270, 100%, 60%)" : "hsl(220, 65%, 54%)",
                boxShadow: isKipish
                  ? "0 0 12px hsl(270 100% 60% / 0.8)"
                  : "0 1px 3px hsl(0 0% 0% / 0.1)",
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
              className={`text-sm font-bold uppercase tracking-wider ${
                isKipish ? "font-display text-primary neon-text" : "text-muted-foreground"
              }`}
            >
              КИПИШ
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Auth button */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className={`text-sm font-medium transition-all ${
            isKipish
              ? "rounded-none border border-primary bg-primary/10 px-5 py-2.5 uppercase tracking-wider text-primary neon-box"
              : "rounded-full border border-border bg-card px-5 py-2.5 text-foreground shadow-sm hover:shadow-md"
          }`}
        >
          {isKipish ? "ВОЙТИ" : "Войти"}
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
