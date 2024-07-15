import { toast, Toaster } from "sonner";

import React, { useEffect } from "react";
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
      console.log("ToastCaller success");
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
