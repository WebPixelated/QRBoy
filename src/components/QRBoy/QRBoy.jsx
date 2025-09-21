import QRCode from "react-qr-code";
import { usePalette } from "../../context/PaletteContext";
// import classes from "./QRBoy.module.css";

function QRBoy({ query, ref }) {
  const { currentPalette } = usePalette();

  const svgRef = ref;

  const screenSize = 32;
  const screenX = 33.5;
  const screenY = 12.25;
  const qrSize = 29.5;

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="18 -1 63.2 91.6"
      style={{
        "--color-100": currentPalette.colors["--color-100"],
        "--color-200": currentPalette.colors["--color-200"],
        "--color-300": currentPalette.colors["--color-300"],
        "--color-400": currentPalette.colors["--color-400"],
      }}
    >
      {/* Outer Frame */}
      <path
        d="M22.75,2.5c-0.625,0-1.125,0.5-1.125,1.125v82.25c0,0.625,0.5,1.125,1.125,1.125h43.688c6.125,0,11.125-4.975,11.125-11.125V3.65c0-0.625-0.5-1.125-1.125-1.125H22.75z"
        fill="var(--color-300)"
        stroke="var(--color-200)"
        strokeWidth="1"
      />

      {/* Main Case */}
      <path
        d="M76.5,0.25c1.85,0,3.35,1.5,3.35,3.35v72.25c0,7.375-5.975,13.375-13.375,13.375H22.75c-1.85,0-3.35-1.5-3.35-3.35V3.65c0-1.85,1.5-3.35,3.35-3.35H76.5z"
        fill="var(--color-400)"
        stroke="var(--color-200)"
        strokeWidth="2"
      />

      {/* QR Code Container */}
      <g id="qr-container">
        {/* Screen Size */}
        <rect
          x={screenX}
          y={screenY}
          width={screenSize}
          height={screenSize}
          fill="var(--color-100)"
          stroke="var(--color-200)"
          strokeWidth="0.5"
        />
        {/* QR Code */}
        {query ? (
          <QRCode
            value={query}
            size={qrSize}
            x={screenX + (screenSize - qrSize) / 2}
            y={screenY + (screenSize - qrSize) / 2}
            fgColor="var(--color-400)"
            bgColor="transparent"
          />
        ) : (
          <g>
            {/* Darkening */}
            <rect
              x={screenX + 2}
              y={screenY + 2}
              width={screenSize - 4}
              height={screenSize - 4}
              fill="var(--color-300)"
              opacity="0.3"
              rx="1"
            />

            {/* Scan Lines */}
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <rect
                key={i}
                x={screenX + 1}
                y={screenY + 2 + i * 3}
                width={screenSize - 2}
                height="1"
                fill="var(--color-400)"
                opacity="0.4"
              />
            ))}
          </g>
        )}
      </g>

      {/* Screen Outer Frame */}
      <path
        d="M72.25,9.25c1,0,1.815,0.812,1.815,1.815v27.25c0,5.0-4.063,9.075-9.075,9.075H26.625c-1,0-1.815-0.812-1.815-1.815V11.0c0-1,0.812-1.815,1.815-1.815H72.25z"
        fill="none"
        stroke="var(--color-200)"
        strokeWidth="0.75"
      />

      {/* D-pad */}
      <g transform="translate(30,58)">
        {/* Horizontal */}
        <rect
          x="-3.75"
          y="3.75"
          width="11.375"
          height="3.45"
          rx="0.9"
          fill="var(--color-200)"
          stroke="var(--color-200)"
          strokeWidth="0.5"
        />
        {/* Vertical */}
        <rect
          x="0"
          y="0"
          width="3.45"
          height="11.375"
          rx="0.9"
          fill="var(--color-200)"
          stroke="var(--color-200)"
          strokeWidth="0.5"
        />
      </g>

      {/* A/B Buttons */}
      <circle
        cx="60.95"
        cy="66"
        r="3.575"
        fill="var(--color-300)"
        stroke="var(--color-200)"
        strokeWidth="1"
      />
      <circle
        cx="70.75"
        cy="61"
        r="3.575"
        fill="var(--color-300)"
        stroke="var(--color-200)"
        strokeWidth="1"
      />

      {/* Start/Select Buttons */}
      <g fill="var(--color-300)" stroke="var(--color-200)" strokeWidth="0.5">
        <rect x="40.5" y="80" width="6" height="2" rx="1" />
        <rect x="50.5" y="80" width="6" height="2" rx="1" />
      </g>
    </svg>
  );
}
export default QRBoy;
