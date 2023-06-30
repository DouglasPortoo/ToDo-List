import rocket from "../assets/rocket.svg";
import todo from "../assets/todo.svg";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={rocket} />
        <img src={todo} />
      </div>
    </header>
  );
};

export default Header;
