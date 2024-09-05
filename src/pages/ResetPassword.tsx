import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import Input from "../components/Form/Input";
import { useOpenModalStore } from "../stores/openModal";

type ResetPasswordForm = {
  password: string;
  confirmPass: string;
};
const ResetPassword = () => {
  const [errorPassword, setErrorPassword] = useState<string>("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [isResetted, setIsResetted] = useState<boolean>(false);
  const { setOpenModal } = useOpenModalStore();

  const navigate = useNavigate();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ResetPasswordForm>();

  const onSubmit: SubmitHandler<ResetPasswordForm> = async (values) => {
    try {
      const { password, confirmPass } = values;
      if (password !== confirmPass) {
        setErrorConfirmPassword("Confirmation does not match!");
      } else {
        const bodyForFetch = {
          password,
          token,
        };
        const response = await fetch(
          `${process.env.REACT_APP_API_URL}/user/reset-password`,
          {
            method: "POST",
            cache: "no-cache",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyForFetch),
          }
        );

        if (response) {
          setIsResetted(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return !token ? (
    <Navigate to={"/"} />
  ) : (
    <div className="mt-36 flex justify-center">
      {isResetted ? (
        <div className="flex flex-col gap-4 w-80">
          <div>
            <p>Your new password has been created. </p>
            <button
              onClick={() => {
                navigate("/");
                setOpenModal(true);
              }}
              className="btn btn-marvel"
            >
              LOGIN
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-80"
        >
          <Input
            type="password"
            register={register}
            name="password"
            label="Your new password"
            required={true}
            error={errors.password}
            errorMessage={errorPassword}
          />
          <Input
            type="password"
            register={register}
            name="confirmPass"
            label="Confirmation"
            required={true}
            error={errors.confirmPass}
            errorMessage={errorConfirmPassword}
          />
          <button className="btn btn-marvel" type="submit">
            Sumbit
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
