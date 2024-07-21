import styles from "./index.module.css";
import logo from "../../assets/Logo.png";
import { useEffect, useState } from "react";

const Header = ({ setGirls }) => {
  const [search, setSearch] = useState("");

  const onEnterClick = async (e) => {
    const key = e.key;
    if (key !== "Enter") return;

    setSearch("");
  };

  useEffect(() => {
    document.addEventListener("keydown", onEnterClick);

    return () => document.removeEventListener("keydown", onEnterClick);
  }, []);

  return (
    <div className={styles.container}>
      <img src={logo} alt="logo" className={styles.logo} />
      {/* <input
        className={styles.input}
        placeholder="Найти девушку..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      /> */}
    </div>
  );
};

export default Header;
