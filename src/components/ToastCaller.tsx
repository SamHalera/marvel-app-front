import { useEffect } from "react";
import { toast, Toaster } from "sonner";

import { useToastStore } from "../stores/toast";

const ToastCaller = () => {
  const {
    successMessage,
    errorMessage,
    infoMessage,
    setSuccessMessage,
    setErrorMessage,
    setInfoMessage,
  } = useToastStore();

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      setSuccessMessage(null);
    }
    if (errorMessage) {
      toast.error(errorMessage);
      setErrorMessage(null);
    }
    if (infoMessage) {
      toast.info(infoMessage);
      setErrorMessage(null);
    }
  }, [successMessage, errorMessage, infoMessage]);
  return <Toaster richColors />;
};

export default ToastCaller;
