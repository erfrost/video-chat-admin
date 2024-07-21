import { useState } from "react";
import styles from "./index.module.css";
import FullScreen from "../FullScreen";
import axiosInstance from "../../axios.config";
import { useNavigate } from "react-router-dom";
import { toastError } from "../../utils/toast";

const GirlItem = ({ girl, setGirls }) => {
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const router = useNavigate();

  const onVerification = async () => {
    try {
      const accessToken = localStorage.getItem("admin_access_token");
      if (!accessToken) return router("/");

      const updatedGirl = await axiosInstance.post(
        `admin/verificationGirl/${girl._id}`,
        {
          Authorization: "sffsf",
        }
      );

      if (updatedGirl) {
        setGirls((prevState) =>
          [...prevState].filter((item) => item._id !== girl._id)
        );
      }
    } catch (error) {
      console.log(error);
      toastError(
        error?.response?.data?.message ||
          "При загрузке данных произошла ошибка."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.left}>
          <img src={girl.avatar} alt="avatar" className={styles.avatar} />
          <div className={styles.info}>
            <span className={styles.text}>_id: {girl._id}</span>
            <span className={styles.text}>Никнейм: {girl.nickname}</span>
            <span className={styles.text}>Дата рождения: {girl.dateBirth}</span>
          </div>
        </div>
        <div className={styles.passportContainer}>
          {girl.passport.map((image) => (
            <img
              src={image}
              alt="passport"
              className={styles.image}
              onClick={() => setFullScreenImage(image)}
            />
          ))}
        </div>
      </div>
      <div className={styles.btn} onClick={onVerification}>
        Верифицировать
      </div>
      {fullScreenImage && (
        <FullScreen image={fullScreenImage} setImage={setFullScreenImage} />
      )}
    </div>
  );
};

export default GirlItem;
