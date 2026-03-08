import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { X, Crosshair } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

const AddProductModal = ({ open, onClose }: AddProductModalProps) => {
  const { isKipish } = useMode();
  const [artWb, setArtWb] = useState("");
  const [artOzon, setArtOzon] = useState("");

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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
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
              {isKipish ? "ВЗЯТЬ НА ПРИЦЕЛ 🎯" : "Добавить товар"}
            </h3>

            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
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
                    : "rounded-xl"
                  }
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold uppercase tracking-wider mb-1.5 ${
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
                    : "rounded-xl"
                  }
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full mt-2 flex items-center justify-center gap-2 py-3 font-bold text-sm transition-all ${
                  isKipish
                    ? "rounded-sm border border-primary bg-primary/20 uppercase tracking-wider text-primary neon-box glow-pulse"
                    : "rounded-xl bg-primary text-primary-foreground shadow-md hover:shadow-lg"
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
