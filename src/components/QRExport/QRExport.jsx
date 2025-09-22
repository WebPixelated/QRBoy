import Button from "../Button/Button";
import classes from "./QRExport.module.css";

function QRExport({ qrBoyRef }) {
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
      // Serialize SVG element
      const svgElement = qrBoyRef.current;
      const svgData = new XMLSerializer().serializeToString(svgElement);

      // Get width and height of SVG
      const viewBox = svgElement.getAttribute("viewBox");
      const [, , viewWidth, viewHeight] = viewBox.split(" ").map(Number);

      // Target 1000px height for PNG, considering aspect ratio
      const targetHeight = 1000;
      const aspectRatio = viewWidth / viewHeight;
      const targetWidth = Math.round(targetHeight * aspectRatio);

      // Create canvas for rendering
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Set width and height of canvas as calculated ones
      canvas.width = targetWidth;
      canvas.height = targetHeight;

      // Create a promise for drawing on canvas and downloading the result
      return new Promise((resolve, reject) => {
        const img = new Image();

        img.onload = () => {
          // Try to draw an image
          try {
            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
            URL.revokeObjectURL(img.src); // Clean up the object URL

            // If blob created, download it as an image
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
    <div className={classes.qrExport}>
      <h4>Download as:</h4>
      <div className={classes.qrExportButtons}>
        <Button action={downloadSVG} title="SVG" />
        <Button action={downloadPNG} title="PNG" />
      </div>
    </div>
  );
}
export default QRExport;
