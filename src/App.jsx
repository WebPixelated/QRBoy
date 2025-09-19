import Content from "./components/Content/Content";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import classes from "./App.module.css";

function App() {
  return (
    <div className={classes.mainContainer}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
}
export default App;
