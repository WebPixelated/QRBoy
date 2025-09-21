import classes from "./QRInput.module.css";

function QRInput({ query, setQuery }) {
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
    <div className={classes.qrInput}>
      <h1>QRBoy: QR-Code Generator</h1>
      <textarea
        id="qrInput"
        type="text"
        required
        value={query}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter text here..."
      />
    </div>
  );
}
export default QRInput;
