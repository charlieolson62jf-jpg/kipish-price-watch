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
        className={`sticky top-0 z-50 border-b transition-all duration-500 ${
          isKipish
            ? "border-border bg-card/95 backdrop-blur-xl noise-bg"
            : "border-border/50 glass"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={mode}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className={`font-display font-bold text-sm sm:text-lg ${
                isKipish
                  ? "uppercase tracking-widest text-primary neon-text"
                  : "tracking-tight text-foreground"
              }`}
            >
              {isKipish ? "OZON-КИПИШ" : "Ozon-Кипиш"}
            </motion.h1>
          </AnimatePresence>

          {/* Center Toggle */}
          <div className="flex items-center gap-2">
            {/* Desktop labels */}
            <span className={`hidden sm:block text-xs uppercase tracking-wider transition-colors ${
              !isKipish ? "font-semibold text-foreground" : "text-muted-foreground"
            }`}>
              Обычный
            </span>

            <button
              onClick={() => setMode(isKipish ? "normal" : "kipish")}
              className={`relative h-9 w-[4.5rem] sm:h-10 sm:w-20 border-2 transition-all duration-300 ${
                isKipish
                  ? "rounded-sm border-primary glow-pulse"
                  : "rounded-full border-border"
              }`}
              style={{
                backgroundColor: isKipish ? "hsl(240, 6%, 8%)" : "hsl(220, 14%, 92%)",
              }}
            >
              <motion.div
                className={`absolute top-1 h-5 w-5 sm:h-6 sm:w-6 ${isKipish ? "rounded-sm" : "rounded-full"}`}
                animate={{
                  left: isKipish ? "calc(100% - 24px)" : "4px",
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
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className={`hidden sm:block text-xs uppercase tracking-wider font-bold ${
                  isKipish ? "font-display text-primary neon-text" : "text-muted-foreground"
                }`}
              >
                КИПИШ
              </motion.span>
            </AnimatePresence>
          </div>

          {/* Right: help + auth */}
          <div className="flex items-center gap-2">
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
                  : "rounded-full border border-border bg-card text-foreground shadow-sm hover:shadow-md"
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
