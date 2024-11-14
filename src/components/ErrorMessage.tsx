import React from "react";
import { Link } from "react-router-dom";

const ErrorMessage = () => {
  return (
    <div className="flex flex-col items-center justify-center bg-primary-gradient py-10">
      <div className="flex flex-col gap-4">
        <BugIcon className="h-24 w-24 text-primary" />
        <h1 className="text-4xl font-bold text-white ">Oops!</h1>
        <p className="text-2xl text-white">
          It looks like something whent wrong... Sorry for that!
        </p>
        <div className="flex gap-8 items-center">
          <div
            onClick={() => window.location.reload()}
            className="btn btn-marvel cursor-pointer"
          >
            Reload the page
          </div>
          <span className="text-white text-2xl">OR</span>
          <Link to="/" className="btn btn-marvel">
            GO TO HOME PAGE
          </Link>
        </div>
      </div>
    </div>
  );
};

function BugIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}
export default ErrorMessage;
