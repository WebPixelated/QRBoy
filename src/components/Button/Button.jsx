import classes from "./Button.module.css";

function Button({ title, action }) {
  return (
    <button className={classes.button} onClick={action}>
      {title}
    </button>
  );
}
export default Button;
