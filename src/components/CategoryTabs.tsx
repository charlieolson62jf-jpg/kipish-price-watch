import { motion } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";

interface CategoryTabsProps {
  categories: string[];
  active: string;
  onChange: (cat: string) => void;
}

const CategoryTabs = ({ categories, active, onChange }: CategoryTabsProps) => {
  const { isKipish } = useMode();

  return (
    <div className="mb-6 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
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
    </div>
  );
};

export default CategoryTabs;
