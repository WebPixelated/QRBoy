import QRCode from "react-qr-code";

function QRCodeShow({ query }) {
  return (
    <div>
      <QRCode
        size={512}
        value={query}
        style={{ height: "128px", width: "128px" }}
      />
    </div>
  );
}
export default QRCodeShow;
