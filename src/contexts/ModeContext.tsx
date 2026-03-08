import React, { createContext, useContext, useState, useCallback, ReactNode } from "react";

type Mode = "normal" | "kipish";

interface ModeContextType {
  mode: Mode;
  setMode: (mode: Mode) => void;
  isKipish: boolean;
  isGlitching: boolean;
}

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setModeState] = useState<Mode>("normal");
  const [isGlitching, setIsGlitching] = useState(false);

  const setMode = useCallback((newMode: Mode) => {
    setIsGlitching(true);
    setTimeout(() => {
      setModeState(newMode);
      setTimeout(() => setIsGlitching(false), 500);
    }, 50);
  }, []);

  return (
    <ModeContext.Provider value={{ mode, setMode, isKipish: mode === "kipish", isGlitching }}>
      <div className={`${mode === "kipish" ? "kipish" : ""} ${isGlitching ? "glitch-active" : ""}`}>
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
