import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default MainLayout;
