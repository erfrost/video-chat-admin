import { useState } from "react";
import styles from "../styles/auth.module.css";
import { toastError } from "../utils/toast";
import axiosInstance from "../axios.config";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const Auth = () => {
  const [login, setLogin] = useState("adminVideoChatLogin");
  const [password, setPassword] = useState("adminVideoChatPassword");
  const router = useNavigate();

  const onSubmit = async () => {
    if (!login || !password) return;

    try {
      const payload = {
        login,
        password,
      };

      const res = await axiosInstance.post("admin/auth", payload);
      console.log(res);
      const accessToken = res.data.admin_access_token;
      if (!accessToken) {
        return toastError("При загрузке данных произошла ошибка.");
      }

      localStorage.setItem("admin_access_token", accessToken);
      router("/home");
    } catch (error) {
      console.log(error);
      toastError(
        error?.response?.data?.message ||
          "При загрузке данных произошла ошибка."
      );
    }
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.block}>
          <span className={styles.title}>Вход в админ панель</span>
          <input
            className={styles.input}
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Пароль"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div
            className={`${styles.btn} ${
              !login || !password ? styles.disabled : null
            }`}
            onClick={onSubmit}
          >
            Войти
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auth;
