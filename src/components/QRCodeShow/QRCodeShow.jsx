import QRBoy from "../QRBoy/QRBoy";

function QRCodeShow({ query }) {
  return (
    <div style={{ marginLeft: "-16px" }}>
      <QRBoy query={query} />
    </div>
  );
}
export default QRCodeShow;
