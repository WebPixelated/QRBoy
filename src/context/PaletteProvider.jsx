import { useEffect, useState } from "react";
import { PaletteContext } from "./PaletteContext";
import { palettes } from "./../palettes";

export const PaletteProvider = ({ children }) => {
  const [currentPalette, setCurrentPalette] = useState(palettes[0]);

  useEffect(() => {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(currentPalette.colors)) {
      root.style.setProperty(key, value);
    }
  }, [currentPalette]);

  const changePalette = (paletteId) => {
    const newPalette = palettes.find((p) => p.id === paletteId);
    if (newPalette) {
      setCurrentPalette(newPalette);
    }
  };

  return (
    <PaletteContext.Provider value={{ currentPalette, changePalette }}>
      {children}
    </PaletteContext.Provider>
  );
};
