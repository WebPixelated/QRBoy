import { useState } from "react";
import QRCodeShow from "../QRCodeShow/QRCodeShow";
import classes from "./Content.module.css";

function Content() {
  const [query, setQuery] = useState("");

  // Handles key press down in textarea (tabulation)
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const target = e.target;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const insert = "  "; // "\t" or 2 whitespace

      const newValue = query.slice(0, start) + insert + query.slice(end);
      setQuery(newValue);

      // Update cursor position
      requestAnimationFrame(() => {
        target.selectionStart = target.selectionEnd = start + insert.length;
      });
    }
  };

  return (
    <main className={classes.main}>
      <section className={classes.qrContainer}>
        <h2>QRBoy: QR-Code Generator</h2>
        <textarea
          id="qrInput"
          type="text"
          required
          value={query}
          onKeyDown={(e) => handleKeyDown(e)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter text here..."
        />
      </section>
      <QRCodeShow query={query} />
    </main>
  );
}
export default Content;
