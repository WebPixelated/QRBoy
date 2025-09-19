import HeaderFunctionality from "../HeaderFunctionality/HeaderFunctionality";
import Logo from "../Logo/Logo";
import classes from "./Header.module.css";

function Header() {
  return (
    <header className={classes.header}>
      <Logo />
      <HeaderFunctionality />
    </header>
  );
}
export default Header;
