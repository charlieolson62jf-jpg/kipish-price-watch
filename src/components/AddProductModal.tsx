import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { X, Crosshair } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const categoryOptions = ["Электроника", "Дом", "Одежда"];

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const { isKipish } = useMode();
  const [artWb, setArtWb] = useState("");
  const [artOzon, setArtOzon] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);

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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
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
              {isKipish ? "ВЗЯТЬ НА ПРИЦЕЛ 🎯" : "Добавить товар"}
            </h3>

            <div className="space-y-5 relative z-10">
              <div>
                <label className={`block text-[10px] font-medium uppercase tracking-[0.15em] mb-2 ${
                  isKipish ? "text-secondary-foreground" : "text-muted-foreground"
                }`}>
                  {isKipish ? "АРТИКУЛ WB" : "Артикул WB"}
                </label>
                <Input
                  value={artWb}
                  onChange={(e) => setArtWb(e.target.value)}
                  placeholder="WB-000000"
                  className={isKipish
                    ? "rounded-sm border-border bg-muted text-foreground font-mono placeholder:text-muted-foreground"
                    : "rounded-2xl border-border/40 bg-background"
                  }
                />
              </div>

              <div>
                <label className={`block text-[10px] font-medium uppercase tracking-[0.15em] mb-2 ${
                  isKipish ? "text-secondary-foreground" : "text-muted-foreground"
                }`}>
                  {isKipish ? "АРТИКУЛ OZON" : "Артикул Ozon"}
                </label>
                <Input
                  value={artOzon}
                  onChange={(e) => setArtOzon(e.target.value)}
                  placeholder="OZ-0000000"
                  className={isKipish
                    ? "rounded-sm border-border bg-muted text-foreground font-mono placeholder:text-muted-foreground"
                    : "rounded-2xl border-border/40 bg-background"
                  }
                />
              </div>

              <div>
                <label className={`block text-[10px] font-medium uppercase tracking-[0.15em] mb-2 ${
                  isKipish ? "text-secondary-foreground" : "text-muted-foreground"
                }`}>
                  {isKipish ? "КАТЕГОРИЯ" : "Категория"}
                </label>
                <div className="flex gap-2 flex-wrap">
                  {categoryOptions.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`px-3 py-1.5 text-xs font-medium tracking-wide transition-all ${
                        isKipish
                          ? `rounded-sm border ${
                              category === cat
                                ? "border-primary bg-primary/20 text-primary"
                                : "border-border bg-muted/30 text-muted-foreground"
                            }`
                          : `rounded-full ${
                              category === cat
                                ? "bg-foreground text-card"
                                : "bg-muted text-muted-foreground"
                            }`
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full mt-3 flex items-center justify-center gap-2 py-3.5 font-semibold text-sm transition-all tracking-wide ${
                  isKipish
                    ? "rounded-sm border border-primary bg-primary/20 uppercase tracking-[0.15em] text-primary neon-box glow-pulse"
                    : "rounded-2xl border-2 border-foreground/80 bg-card text-foreground hover:bg-foreground hover:text-card"
                }`}
              >
                <Crosshair className="h-4 w-4" />
                {isKipish ? "ВЗЯТЬ НА ПРИЦЕЛ" : "Добавить товар"}
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddProductModal;
