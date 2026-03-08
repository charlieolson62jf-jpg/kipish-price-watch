import { motion, AnimatePresence } from "framer-motion";
import { useMode } from "@/contexts/ModeContext";
import { AlertTriangle, CheckCircle, Plus, ShieldCheck, Target } from "lucide-react";

interface Product {
  id: number;
  artWb: string;
  artOzon: string;
  priceWb: number;
  priceOzon: number;
  diff: number;
  status: "ok" | "alert";
}

const mockProducts: Product[] = [
  { id: 1, artWb: "WB-284712", artOzon: "OZ-1847291", priceWb: 2490, priceOzon: 2490, diff: 0, status: "ok" },
  { id: 2, artWb: "WB-938471", artOzon: "OZ-7382910", priceWb: 1290, priceOzon: 1490, diff: 200, status: "ok" },
  { id: 3, artWb: "WB-571839", artOzon: "OZ-4829103", priceWb: 890, priceOzon: 1190, diff: -300, status: "alert" },
  { id: 4, artWb: "WB-129384", artOzon: "OZ-9381720", priceWb: 3990, priceOzon: 3990, diff: 0, status: "ok" },
  { id: 5, artWb: "WB-847291", artOzon: "OZ-2918374", priceWb: 799, priceOzon: 990, diff: -191, status: "alert" },
];

const ProductTable = () => {
  const { isKipish } = useMode();
  const hasAlert = mockProducts.some((p) => p.status === "alert");

  const normalTexts = {
    title: "Мониторинг индекса цен",
    subtitle: "Отслеживайте расхождения цен между площадками",
    statusOk: "Все показатели в норме",
    statusAlert: "Обнаружено расхождение цен",
    addBtn: "Добавить товар",
    protectBtn: "Активировать защиту (990₽/мес)",
  };

  const kipishTexts = {
    title: "Че там по индексу?",
    subtitle: "Следим за каждым движением",
    statusOk: "Всё чётко, Озон спит 😴",
    statusAlert: "ШУХЕР! На ВБ дешевле! Исправляй, пока не прилетело! 🚨",
    addBtn: "Взять на мушку 🎯",
    protectBtn: "Врубить защиту (990₽/мес) ⚡",
  };

  const t = isKipish ? kipishTexts : normalTexts;

  return (
    <div className="container mx-auto px-6 py-8">
      {/* Status Banner */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${isKipish}-${hasAlert}`}
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className={`mb-8 rounded-xl border p-6 ${
            hasAlert
              ? isKipish
                ? "border-destructive neon-border bg-destructive/10"
                : "border-destructive/30 bg-destructive/5"
              : isKipish
                ? "border-primary neon-border bg-primary/10"
                : "border-success/30 bg-success/5"
          }`}
        >
          <div className="flex items-center gap-3">
            {hasAlert ? (
              <AlertTriangle className={`h-6 w-6 ${isKipish ? "text-destructive neon-text-red" : "text-destructive"}`} />
            ) : (
              <CheckCircle className={`h-6 w-6 ${isKipish ? "text-primary" : "text-success"}`} />
            )}
            <div>
              <h2 className={`font-display text-lg font-bold ${hasAlert && isKipish ? "neon-text-red text-destructive" : ""}`}>
                {hasAlert ? t.statusAlert : t.statusOk}
              </h2>
              <p className="text-sm text-muted-foreground">
                {mockProducts.filter((p) => p.status === "alert").length} из {mockProducts.length} товаров требуют внимания
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Title + Actions */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <AnimatePresence mode="wait">
            <motion.h2
              key={`title-${isKipish}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`font-display text-2xl font-bold ${isKipish ? "neon-text" : ""}`}
            >
              {t.title}
            </motion.h2>
          </AnimatePresence>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all ${
              isKipish
                ? "neon-box border border-primary bg-primary/20 text-primary"
                : "bg-primary text-primary-foreground shadow-md hover:shadow-lg"
            }`}
          >
            {isKipish ? <Target className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
            {t.addBtn}
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-semibold transition-all ${
              isKipish
                ? "border-warning/50 bg-warning/10 text-warning"
                : "border-border bg-card text-foreground hover:bg-accent"
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            {t.protectBtn}
          </motion.button>
        </div>
      </div>

      {/* Table */}
      <motion.div
        layout
        className={`overflow-hidden rounded-xl border ${
          isKipish ? "neon-box border-border" : "border-border shadow-sm"
        }`}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Артикул WB
                </th>
                <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Артикул Ozon
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Цена WB
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Цена Ozon
                </th>
                <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Разница
                </th>
                <th className="px-5 py-3.5 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Статус
                </th>
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((product, i) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-b border-border transition-colors last:border-0 ${
                    product.status === "alert" && isKipish
                      ? "bg-destructive/5"
                      : "hover:bg-muted/30"
                  }`}
                >
                  <td className="px-5 py-4 font-mono text-sm">{product.artWb}</td>
                  <td className="px-5 py-4 font-mono text-sm">{product.artOzon}</td>
                  <td className="px-5 py-4 text-right text-sm font-medium">
                    {product.priceWb.toLocaleString("ru-RU")} ₽
                  </td>
                  <td className="px-5 py-4 text-right text-sm font-medium">
                    {product.priceOzon.toLocaleString("ru-RU")} ₽
                  </td>
                  <td className={`px-5 py-4 text-right text-sm font-bold ${
                    product.diff === 0
                      ? "text-muted-foreground"
                      : product.diff < 0
                        ? "text-destructive"
                        : "text-success"
                  }`}>
                    {product.diff === 0 ? "—" : `${product.diff > 0 ? "+" : ""}${product.diff} ₽`}
                  </td>
                  <td className="px-5 py-4 text-center">
                    <AnimatePresence mode="wait">
                      {product.status === "ok" ? (
                        <motion.span
                          key={`ok-${isKipish}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            isKipish
                              ? "bg-primary/20 text-primary"
                              : "bg-success/10 text-success"
                          }`}
                        >
                          <CheckCircle className="h-3.5 w-3.5" />
                          {isKipish ? "Чётко" : "Норма"}
                        </motion.span>
                      ) : (
                        <motion.span
                          key={`alert-${isKipish}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                            isKipish
                              ? "neon-text-red bg-destructive/20 text-destructive"
                              : "bg-destructive/10 text-destructive"
                          }`}
                        >
                          <AlertTriangle className="h-3.5 w-3.5" />
                          {isKipish ? "ШУХЕР!" : "Расхождение"}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductTable;
