import { useEffect, useState } from "react";
import styles from "../styles/home.module.css";
import axiosInstance from "../axios.config";
import { toastError } from "../utils/toast";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Header from "../Components/Header";
import GirlItem from "../Components/GirlItem";

const Home = () => {
  const [girls, setGirls] = useState([]);
  const router = useNavigate();
  console.log(girls);
  useEffect(() => {
    async function getGirls() {
      try {
        const accessToken = localStorage.getItem("admin_access_token");

        if (!accessToken) return router("/");

        const res = await axiosInstance.get("admin/notVerifiedGirls", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setGirls(res.data.not_verified_girls);
      } catch (error) {
        toastError(
          error?.response?.data?.message ||
            "При загрузке данных произошла ошибка."
        );
      }
    }

    getGirls();
  }, []);

  return (
    <MainLayout>
      <div className={styles.container}>
        <Header setGirls={setGirls} />
        <div className={styles.list}>
          {girls.length ? (
            girls.map((girl) => (
              <GirlItem girl={girl} setGirls={setGirls} key={girl._id} />
            ))
          ) : (
            <span className={styles.nullText}>Ничего не найдено</span>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Home;
