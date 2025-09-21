import { useRef, useState } from "react";
import classes from "./Content.module.css";
import QRBoy from "../QRBoy/QRBoy";
import Button from "../Button/Button";

function Content() {
  const [query, setQuery] = useState("");
  const qrBoyRef = useRef(null);

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

  const downloadSVG = () => {
    if (!qrBoyRef.current) return;

    try {
      // Serialize the SVG element to a string
      const svgData = new XMLSerializer().serializeToString(qrBoyRef.current);

      // Create a Blob from the SVG data
      const blob = new Blob([svgData], { type: "image/svg+xml" });

      // Create an object URL from the Blob
      const url = URL.createObjectURL(blob);

      // Create a temporary link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = "qrboy.svg";

      // Programmatically click the link to start the download
      document.body.appendChild(link); // Append to body to ensure it's clickable in all browsers
      link.click();
      document.body.removeChild(link); // Clean up by removing the link

      // Revoke the object URL to free up memory
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading SVG:", error);
      alert("Error downloading SVG. Please try again.");
    }
  };

  const downloadPNG = async () => {
    if (!qrBoyRef.current) return;

    try {
      const svgElement = qrBoyRef.current;
      const svgData = new XMLSerializer().serializeToString(svgElement);

      const viewBox = svgElement.getAttribute("viewBox");
      const [, , viewWidth, viewHeight] = viewBox.split(" ").map(Number);

      const targetHeight = 1000;
      const aspectRatio = viewWidth / viewHeight;
      const targetWidth = Math.round(targetHeight * aspectRatio);

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = targetWidth;
      canvas.height = targetHeight;

      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          try {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            URL.revokeObjectURL(img.src); // Clean up the object URL

            canvas.toBlob(
              (blob) => {
                if (blob) {
                  const url = URL.createObjectURL(blob);
                  const link = document.createElement("a");
                  link.href = url;
                  link.download = "qrboy.png";
                  link.click();
                  URL.revokeObjectURL(url);
                  resolve();
                } else {
                  reject(new Error("Couldn't create a blob"));
                }
              },
              "image/png",
              1.0
            );
          } catch (error) {
            reject(error);
          }
        };

        img.onerror = () => {
          reject(new Error("Couldn't load SVG"));
        };

        const blob = new Blob([svgData], { type: "image/svg+xml" });
        img.src = URL.createObjectURL(blob);
      });
    } catch (error) {
      console.error("Error converting to PNG:", error);
      alert("Error converting to PNG. Please try again.");
    }
  };

  return (
    <main className={classes.main}>
      <section className={classes.qrContainer}>
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
        <div className={classes.exportAs}>
          <h4>Download as:</h4>
          <div className={classes.exportAsButtons}>
            <Button action={downloadSVG} title="SVG" />
            <Button action={downloadPNG} title="PNG" />
          </div>
        </div>
      </section>
      <div className={classes.right}>
        <QRBoy query={query} ref={qrBoyRef} />
      </div>
    </main>
  );
}
export default Content;
