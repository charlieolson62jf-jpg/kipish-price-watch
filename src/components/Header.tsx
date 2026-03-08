import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { HelpCircle } from "lucide-react";
import { useState } from "react";
import HelpModal from "./HelpModal";

const Header = () => {
  const { mode, setMode, isKipish } = useMode();
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          isKipish
            ? "border-b border-border bg-card/95 backdrop-blur-xl noise-bg"
            : "border-b border-border/30 bg-background/80 backdrop-blur-xl"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3.5">
          {/* Logo */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`font-display font-bold shrink-0 ${
                isKipish
                  ? "text-sm sm:text-lg uppercase tracking-widest text-primary neon-text"
                  : "text-lg sm:text-xl tracking-wide text-foreground"
              }`}
            >
              {isKipish ? "OZON-КИПИШ" : "Ozon-Кипиш"}
            </motion.h1>
          </AnimatePresence>

          {/* Center Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 absolute left-1/2 -translate-x-1/2">
            <span className={`hidden sm:block text-[11px] uppercase tracking-[0.15em] transition-colors ${
              !isKipish ? "font-medium text-foreground" : "text-muted-foreground"
            }`}>
              Обычный
            </span>

            <button
              onClick={() => setMode(isKipish ? "normal" : "kipish")}
              className={`relative h-8 w-16 sm:h-10 sm:w-20 border-2 transition-all duration-300 ${
                isKipish
                  ? "rounded-sm border-primary glow-pulse"
                  : "rounded-full border-border/60"
              }`}
              style={{
                backgroundColor: isKipish ? "hsl(240, 6%, 8%)" : "hsl(40, 20%, 92%)",
              }}
            >
              <motion.div
                className={`absolute top-1 h-4 w-4 sm:h-6 sm:w-6 ${isKipish ? "rounded-sm" : "rounded-full"}`}
                animate={{
                  left: isKipish ? "calc(100% - 22px)" : "4px",
                  backgroundColor: isKipish ? "hsl(270, 100%, 60%)" : "hsl(220, 10%, 12%)",
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
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className={`hidden sm:block text-[11px] uppercase tracking-[0.15em] font-bold ${
                  isKipish ? "font-display text-primary neon-text" : "text-muted-foreground"
                }`}
              >
                КИПИШ
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Right: help + auth */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setHelpOpen(true)}
              className={`flex items-center justify-center h-9 w-9 rounded-full transition-colors ${
                isKipish
                  ? "text-muted-foreground hover:text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <HelpCircle className="h-5 w-5" />
            </button>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className={`text-xs sm:text-sm font-medium transition-all px-3 sm:px-5 py-2 ${
                isKipish
                  ? "rounded-sm border border-primary bg-primary/10 uppercase tracking-wider text-primary neon-box"
                  : "rounded-full border border-foreground/20 bg-card text-foreground tracking-wide"
              }`}
            >
              {isKipish ? "ВОЙТИ" : "Войти"}
            </motion.button>
          </div>
        </div>
      </motion.header>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
};

export default Header;
