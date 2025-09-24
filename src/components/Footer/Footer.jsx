import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={classes.footer}>
      <p>
        Made by{" "}
        <a
          href="https://github.com/WebPixelated"
          target="_blank"
          rel="noopener noreferrer"
        >
          WildPX
        </a>
        . Palettes from{" "}
        <a href="https://lospec.com/" target="_blank" rel="noopener noreferrer">
          Lospec
        </a>
        .
      </p>
    </footer>
  );
}
export default Footer;
