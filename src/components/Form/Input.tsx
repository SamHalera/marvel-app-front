import React, { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";
import { SignUpFormValues } from "./SignUpForm";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Input = ({
  label,
  register,
  required,
  error,
  errorMessage,
  name,
  type,
}: {
  label: string;
  register: UseFormRegister<SignUpFormValues>;
  required: boolean;
  error: FieldError | undefined;
  errorMessage: string;
  name: "username" | "email" | "password";
  type: string;
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  if (error?.type === "required") {
    errorMessage = "Champs obligatoire";
  }
  return (
    <label className="form-control w-full max-w-xs">
      <div className="label">
        <span className="label-text text-white text-xl">{label}</span>
        {errorMessage && (
          <span className="label-text-alt text-red-600">{errorMessage}</span>
        )}
      </div>

      <div className="relative">
        <input
          {...register(name, {
            required,
          })}
          type={
            type === "password" ? `${showPass ? "text" : "password"}` : type
          }
          className="input input-bordered w-full max-w-xs"
        />
        {name === "password" && (
          <>
            {!showPass ? (
              <EyeIcon
                onClick={() => {
                  setShowPass(true);
                }}
                className="size-6 absolute right-2 top-3 cursor-pointer"
              />
            ) : (
              <EyeSlashIcon
                onClick={() => {
                  setShowPass(false);
                }}
                className="size-6 absolute right-2 top-3 cursor-pointer"
              />
            )}
          </>
        )}
      </div>
    </label>
  );
};

export default Input;
