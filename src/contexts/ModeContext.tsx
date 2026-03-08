import React, { createContext, useContext, useState, ReactNode } from "react";

type Mode = "normal" | "kipish";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isKipish: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<Mode>("normal");

  return (
    <ModeContext.Provider value={{ mode, setMode, isKipish: mode === "kipish" }}>
      <div className={mode === "kipish" ? "kipish" : ""}>
        {children}
      </div>
    </ModeContext.Provider>
  );
};

export const useMode = () => {
  const context = useContext(ModeContext);
  if (!context) throw new Error("useMode must be used within ModeProvider");
  return context;
};
