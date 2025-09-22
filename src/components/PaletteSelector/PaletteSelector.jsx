import { useEffect, useRef, useState } from "react";
import { usePalette } from "../../context/PaletteContext";
import { palettes } from "../../palettes";
import classes from "./PaletteSelector.module.css";

function PaletteSelector() {
  const [open, setOpen] = useState(false);
  const { currentPalette, changePalette } = usePalette();

  // Ref for checking if user clicked outside content, then menu will close
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className={classes.paletteSelector} ref={wrapperRef}>
      <button
        className={`${classes.paletteToggle} ${
          open ? classes.paletteActive : ""
        }`}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
      >
        Palettes
      </button>
      {open && (
        <div className={classes.paletteContent}>
          {palettes.map((palette) => (
            <button
              key={palette.id}
              onClick={() => changePalette(palette.id)}
              className={`${classes.paletteContentButton} ${
                currentPalette.id === palette.id
                  ? classes.paletteContentButtonActive
                  : ""
              }`}
            >
              <div className={classes.paletteNameContainer}>
                <p>{palette.name}</p>
                {palette.author && <span>{palette.author}</span>}
              </div>
              <div className={classes.paletteColors}>
                {Object.values(palette.colors).map((color) => (
                  <div
                    key={color}
                    className={classes.paletteColor}
                    style={{ background: color }}
                  ></div>
                ))}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
export default PaletteSelector;
