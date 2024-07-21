import { toast } from "react-toastify";

export const toastSuccess = (message) => {
  return toast.success(message, {
    position: "bottom-right",
  });
};

export const toastWarning = (message) => {
  return toast.warning(message, {
    position: "bottom-right",
  });
};

export const toastError = (message) => {
  return toast.error(message, {
    position: "bottom-right",
  });
};
