import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
  isLoggedIn?: boolean;
  onAddCategory?: (name: string) => void;
  onRequestAuth?: () => void;
}

const CategoryTabs = ({ categories, active, onChange, isLoggedIn, onAddCategory, onRequestAuth }: CategoryTabsProps) => {
  const { isKipish } = useMode();
  const [showInput, setShowInput] = useState(false);
  const [newCatName, setNewCatName] = useState("");

  const handleAddClick = () => {
    if (!isLoggedIn) {
      onRequestAuth?.();
      return;
    }
    setShowInput(true);
  };

  const handleSubmit = () => {
    const trimmed = newCatName.trim();
    if (trimmed && onAddCategory) {
      onAddCategory(trimmed);
    }
    setNewCatName("");
    setShowInput(false);
  };

  return (
    <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar" style={{ WebkitOverflowScrolling: 'touch' }}>
      {categories.map((cat) => {
        const isActive = cat === active;
        return (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(cat)}
            className={`relative shrink-0 px-4 py-2 text-xs font-medium tracking-[0.1em] uppercase transition-all ${
              isKipish
                ? `rounded-sm border ${
                    isActive
                      ? "border-primary bg-primary/20 text-primary neon-box"
                      : "border-border/30 bg-card/50 text-muted-foreground hover:text-foreground"
                  }`
                : `rounded-full ${
                    isActive
                      ? "bg-foreground text-card"
                      : "bg-transparent text-muted-foreground hover:text-foreground"
                  }`
            }`}
          >
            {cat}
          </motion.button>
        );
      })}

      {/* Add category — mobile-friendly */}
      <AnimatePresence>
        {showInput ? (
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="flex items-center gap-1.5 shrink-0"
          >
            <Input
              autoFocus
              value={newCatName}
              onChange={(e) => setNewCatName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
              placeholder={isKipish ? "НАЗВАНИЕ" : "Категория"}
              className={`h-8 w-28 text-xs ${
                isKipish
                  ? "rounded-sm border-border bg-muted font-mono text-foreground placeholder:text-muted-foreground"
                  : "rounded-full border-border/40 bg-background"
              }`}
            />
            <button onClick={handleSubmit} className="shrink-0 text-success">
              <Plus className="h-4 w-4" />
            </button>
            <button onClick={() => { setShowInput(false); setNewCatName(""); }} className="shrink-0 text-muted-foreground">
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddClick}
            className={`shrink-0 flex items-center justify-center h-8 w-8 transition-all ${
              isKipish
                ? "rounded-sm border border-border/30 bg-card/50 text-muted-foreground hover:text-primary hover:border-primary/50"
                : "rounded-full text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Plus className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryTabs;
