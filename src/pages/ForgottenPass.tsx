import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../components/Form/Input";
import { useState } from "react";

export type ForgottenPasswordForm = {
  email: string;
};

const ForgottenPass = () => {
  const [errorEmail, setErrorEmail] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ForgottenPasswordForm>();

  const onSubmit: SubmitHandler<ForgottenPasswordForm> = async (values) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/forgotten-password`,
        {
          method: "POST",
          cache: "no-cache",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-36">
      <h2 className="text-white text-xl md:text-2xl text-center mb-9">
        Did you forget your password?
      </h2>
      <p className="text-center mb-9">
        Enter your email address and we will send you all the instrusctions in
        order to reset your new password
      </p>
      <div className=" flex justify-center ">
        {isSubmitSuccessful ? (
          <div>
            <h2 className=" text-success text-xl md:text-2xl text-center mb-9">
              An eamil has been sent successfully to your address
            </h2>
            <p className="text-success text-center mb-9">
              Please check your mailbox and follow the instructions
            </p>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Input
              type="email"
              register={register}
              name="email"
              label="Your email"
              required={true}
              error={errors.email}
              errorMessage={errorEmail}
            />
            <button className="btn btn-marvel" type="submit">
              Sumbit
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgottenPass;
