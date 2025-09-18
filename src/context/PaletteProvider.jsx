import { PaletteContext } from "./PaletteContext";

export const PaletteProvider = ({ children }) => {
  return (
    <PaletteContext.Provider value={{}}>{children}</PaletteContext.Provider>
  );
};
