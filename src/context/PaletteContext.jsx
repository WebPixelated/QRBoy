import { createContext, useContext } from "react";

export const PaletteContext = createContext({});
export const usePalette = () => useContext(PaletteContext);
