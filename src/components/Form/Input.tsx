import { useState } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Input = ({
  label,
  register,
  required,
  error,
  errorMessage,
  name,
  type,
  disabled,
}: {
  label: string;
  register: UseFormRegister<any>;
  required: boolean;
  error: FieldError | undefined;
  errorMessage: string;
  name: string;
  type: string;
  disabled?: boolean;
}) => {
  const [showPass, setShowPass] = useState<boolean>(false);
  if (error?.type === "required") {
    errorMessage = "Champs obligatoire";
  }
  return (
    <label className="form-control w-full">
      <div className="label">
        <span className="label-text text-white text-xl mr-2">{label}</span>
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
          className="input input-bordered w-full  rounded-none"
          disabled={disabled}
        />
        {type === "password" && (
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
