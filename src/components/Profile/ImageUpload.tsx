import React from "react";
import { UserIcon } from "@heroicons/react/24/solid";
import { FieldError, UseFormRegister } from "react-hook-form";
import { CloudinaryFile } from "../../types";

const ImageUpload = ({
  register,
  userAvatar,
  error,
  errorMessage,
  name,
  disabled,
}: {
  register: UseFormRegister<any>;
  userAvatar?: CloudinaryFile;
  error: FieldError | undefined;
  errorMessage: string;
  name: string;

  disabled?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-8 items-center">
      {userAvatar ? (
        <img className="rounded-full w-40" src={userAvatar.secure_url} />
      ) : (
        <UserIcon className="size-24 rounded-full border" />
      )}

      <input
        {...register(name, {
          validate: {
            lessThan10MB: (name) => name[0]?.size < 80000 || "Max 80kb",
            acceptedFormats: (name: any) => {
              return (
                ["image/jpeg", "image/png"].includes(name[0]?.type) ||
                "Only PNG, JPEG"
              );
            },
          },
        })}
        type="file"
        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
      />
      {error && (
        <span className="label-text-alt text-red-600 text-xs">
          {error.message}
        </span>
      )}
    </div>
  );
};

export default ImageUpload;
