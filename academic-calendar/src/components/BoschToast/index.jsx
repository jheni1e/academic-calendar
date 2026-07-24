import { toast } from "react-toastify";

const defaultOptions = {
  position: "bottom-center",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: "colored"
};

export const toastSuccess = (message) => {
  toast.success(message, {
    ...defaultOptions,
  });
};

export const toastError = (message) => {
  toast.error(message, {
    ...defaultOptions,
  });
};

export const toastWarning = (message) => {
    toast.warning(message, {
        ...defaultOptions,
    });
}
