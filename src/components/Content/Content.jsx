import { useRef, useState } from "react";
import classes from "./Content.module.css";
import QRBoy from "../QRBoy/QRBoy";
import QRExport from "../QRExport/QRExport";
import QRInput from "../QRInput/QRInput";

function Content() {
  const [query, setQuery] = useState("");
  const qrBoyRef = useRef(null);

  return (
    <main className={classes.main}>
      <section className={classes.qrContainer}>
        <QRInput query={query} setQuery={setQuery} />
        <QRExport qrBoyRef={qrBoyRef} />
      </section>
      <div className={classes.qrShow}>
        <QRBoy query={query} ref={qrBoyRef} />
      </div>
    </main>
  );
}
export default Content;
