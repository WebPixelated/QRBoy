import { ReactSVG } from "react-svg";
import qrboyMini from "../../assets/qrboy-mini.svg";
import classes from "./Logo.module.css";

function Logo() {
  return (
    <a href="#" className={classes.logo}>
      <ReactSVG className={classes.logoSvg} src={qrboyMini} />
      <h2>QRBoy</h2>
    </a>
  );
}
export default Logo;
