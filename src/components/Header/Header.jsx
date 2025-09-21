import Logo from "../Logo/Logo";
import PaletteSelector from "../PaletteSelector/PaletteSelector";
import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <Logo />
      <PaletteSelector />
    </header>
  );
}
export default Header;
