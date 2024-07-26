import React, { useState } from "react";
import { CloudinaryFile, UserInterface } from "../../types";
import { SubmitHandler, useForm } from "react-hook-form";
import { UserIcon } from "@heroicons/react/24/solid";
import Input from "../Form/Input";
import { baseAPIUrl } from "../../api";
import Cookies from "js-cookie";
import { useToastStore } from "../../stores/toast";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";
import { useCurrentAvatarStore } from "../../stores/currentAvatar";

export type FormProfileValues = {
  picture?: string;
  username: string;
  email: string;
  password: string;
  newPassword: string;
  confirmNewPassword: string;
};
const FormProfile = ({
  userData,
  setIsSubmitted,
}: {
  userData: UserInterface;
  setIsSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [errorUsername, setErrorUsername] = useState<string>("");
  const [errorPicture, setErrorPicture] = useState<string>("");
  const [errorEmail, setErrorEmail] = useState<string>("");
  const [errorPass, setErrorPass] = useState<string>("");
  const [errorNewPass, setErrorNewPass] = useState<string>("");
  const [errorConfirmPass, setErrorConfirmPass] = useState<string>("");
  const [errorForm, setErrorForm] = useState<string>("");
  const { setSuccessMessage } = useToastStore();
  const { currentAvatar, setCurrentAvatar } = useCurrentAvatarStore();
  const tokenCookies = Cookies.get("token");

  const navigate = useNavigate();
  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<FormProfileValues>({
    values: {
      picture: userData.avatar.secure_url ?? "",
      username: userData.username ?? "",
      email: userData.email ?? "",
      password: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormProfileValues> = async (values) => {
    try {
      const {
        email,
        username,
        password,
        newPassword,
        confirmNewPassword,
        picture,
      } = values;

      console.log(picture);

      if (newPassword && !password) {
        setErrorPass("It seems you forget to enter your current password");
      } else if (newPassword !== confirmNewPassword) {
        console.log("newPassword", newPassword);
        console.log("confirmNewPassword", confirmNewPassword);
        setErrorConfirmPass("New password and confirmation must be the same!");
      } else {
        const formData = new FormData();
        username && formData.append("username", username);
        password && formData.append("password", password);
        newPassword && formData.append("newPassword", newPassword);

        picture && formData.append("picture", picture[0]);

        const response = await fetch(`${baseAPIUrl}/user/profile`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${tokenCookies}`,
            // "Content-Type": "multipart/form-data",
          },
          body: formData,
        });
        const data = await response.json();

        if (data?.type === "error") {
          setErrorForm(data.message);
        } else {
          setErrorForm("");
          setSuccessMessage("Profile updated!");
          reset();
          setIsSubmitted(true);
          picture && setCurrentAvatar(data.avatar);
        }
      }
    } catch (error: any) {
      console.log("error==>", error.message);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-3/3 mx-auto flex flex-col gap-5 lg:w-2/3"
    >
      <h2 className=" my-6 text-center text-2xl font-bold text-white">
        {userData.username}
      </h2>
      <div className="flex items-start justify-center gap-8">
        <div className="flex-1">
          <ImageUpload
            userAvatar={userData.avatar}
            register={register}
            name="picture"
            error={errors.picture}
            errorMessage={errorPicture}
          />
        </div>
        <div>
          {" "}
          <span className="label-text-alt text-red-600 text-xs">
            {errorForm && errorForm}
          </span>
        </div>
        <div className="flex flex-col gap-6 flex-1 w-full">
          <Input
            register={register}
            name="email"
            label="Email"
            required={false}
            error={errors.email}
            type="email"
            errorMessage={errorEmail}
            disabled={true}
          />
          <Input
            register={register}
            name="username"
            label="Username"
            required={false}
            error={errors.username}
            type="text"
            errorMessage={errorUsername}
          />

          <div className="lex flex-col gap-6 w-full">
            <Input
              register={register}
              name="password"
              label="Password"
              required={false}
              error={errors.password}
              type="password"
              errorMessage={errorPass}
            />
            <Input
              register={register}
              name="newPassword"
              label="New password"
              required={false}
              error={errors.newPassword}
              type="password"
              errorMessage={errorNewPass}
            />
            <Input
              register={register}
              name="confirmNewPassword"
              label="Confirm new password"
              required={false}
              error={errors.confirmNewPassword}
              type="password"
              errorMessage={errorConfirmPass}
            />
          </div>
        </div>
      </div>
      <button
        disabled={!isDirty}
        className="btn btn-marvel self-end mt-4"
        type="submit"
      >
        VALIDATE
      </button>
    </form>
  );
};

export default FormProfile;
