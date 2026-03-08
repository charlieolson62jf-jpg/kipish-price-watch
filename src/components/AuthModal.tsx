import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { X, LogIn } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface AuthModalProps {
  open: boolean;
  onClose: () => void;
}

const AuthModal = ({ open, onClose }: AuthModalProps) => {
  const { isKipish } = useMode();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — will connect to Supabase Auth
    console.log(isLogin ? "Login" : "Register", { email, password });
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
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`relative z-10 w-full max-w-sm p-8 ${
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

            <h3
              className={`font-display font-bold text-xl mb-2 ${
                isKipish
                  ? "uppercase tracking-[0.15em] text-primary neon-text"
                  : "tracking-wide text-foreground"
              }`}
            >
              {isLogin
                ? isKipish ? "ВОЙТИ В СИСТЕМУ" : "Вход"
                : isKipish ? "РЕГИСТРАЦИЯ" : "Регистрация"}
            </h3>

            <p className="text-xs text-muted-foreground mb-6 tracking-wide">
              {isKipish
                ? "ТВОИ ТОВАРЫ И ПОДПИСКА ПРИВЯЗАНЫ К АККАУНТУ"
                : "Ваши товары и подписка сохранятся в аккаунте"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
              <div>
                <label
                  className={`block text-[10px] font-medium uppercase tracking-[0.15em] mb-2 ${
                    isKipish ? "text-secondary-foreground" : "text-muted-foreground"
                  }`}
                >
                  Email
                </label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className={
                    isKipish
                      ? "rounded-sm border-border bg-muted text-foreground font-mono placeholder:text-muted-foreground"
                      : "rounded-2xl border-border/40 bg-background"
                  }
                />
              </div>

              <div>
                <label
                  className={`block text-[10px] font-medium uppercase tracking-[0.15em] mb-2 ${
                    isKipish ? "text-secondary-foreground" : "text-muted-foreground"
                  }`}
                >
                  {isKipish ? "ПАРОЛЬ" : "Пароль"}
                </label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className={
                    isKipish
                      ? "rounded-sm border-border bg-muted text-foreground font-mono placeholder:text-muted-foreground"
                      : "rounded-2xl border-border/40 bg-background"
                  }
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={`w-full mt-2 flex items-center justify-center gap-2 py-3.5 font-semibold text-sm transition-all tracking-wide ${
                  isKipish
                    ? "rounded-sm border border-primary bg-primary/20 uppercase tracking-[0.15em] text-primary neon-box"
                    : "rounded-2xl border-2 border-foreground/80 bg-card text-foreground hover:bg-foreground hover:text-card"
                }`}
              >
                <LogIn className="h-4 w-4" />
                {isLogin
                  ? isKipish ? "ВОЙТИ" : "Войти"
                  : isKipish ? "ЗАРЕГАТЬСЯ" : "Создать аккаунт"}
              </motion.button>
            </form>

            <button
              onClick={() => setIsLogin(!isLogin)}
              className={`mt-5 w-full text-center text-xs tracking-wide transition-colors ${
                isKipish
                  ? "text-muted-foreground hover:text-primary uppercase"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isLogin
                ? isKipish ? "НЕТ АККАУНТА? СОЗДАЙ" : "Нет аккаунта? Зарегистрируйтесь"
                : isKipish ? "УЖЕ ЕСТЬ? ЗАХОДИ" : "Уже есть аккаунт? Войдите"}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
