import { Link, Outlet } from "react-router-dom";
import styles from "./layout.module.scss";

export const Layout = () => {
  return (
    <div className={styles.layoutContentWrapper}>
      <div className={styles.layoutContent}>
        <nav className={styles.layoutNavbar}>
          <Link to={"/add"}>Add user </Link>
          <Link to={"/users"}>User list</Link>
        </nav>
        <div className={styles.usersList}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};
