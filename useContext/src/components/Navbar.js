import { Link } from "react-router-dom";
import { useTheme } from "../theme-provider";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav>
      <div>
        <Link to="/">home</Link>
      </div>
      <div>
        <Link to="/blog">blog</Link>
      </div>
      <div>
        <Link to="/about">about</Link>
      </div>
      <div
        onClick={toggleTheme}
        className={`${
          theme === "dark" ? "toggle__theme dark" : "toggle__theme"
        }`}
      ></div>
    </nav>
  );
}
export default Navbar;
