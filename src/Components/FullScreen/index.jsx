import styles from "./index.module.css";
import closeIcon from "../../assets/close.svg";

const FullScreen = ({ image, setImage }) => {
  return (
    <div className={styles.fullScreen}>
      <img
        src={closeIcon}
        alt="close"
        className={styles.closeIcon}
        onClick={() => setImage(null)}
      />
      <img src={image} alt="image" className={styles.image} />
    </div>
  );
};

export default FullScreen;
