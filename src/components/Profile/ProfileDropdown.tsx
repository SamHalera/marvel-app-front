import clsx from "clsx";
import Cookies from "js-cookie";
import React, { SetStateAction, useEffect, useRef } from "react";
import { useTokenCookiesStore } from "../../stores/tokenCookies";
import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";

const ProfileDropdown = ({
  showMenu,

  setSwhoMenu,
}: {
  showMenu: boolean;
  setSwhoMenu: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const { setTokenCookies } = useTokenCookiesStore();
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCLick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setSwhoMenu(false);
      }
    };
    window.addEventListener("click", handleCLick);
    return () => {
      window.removeEventListener("click", handleCLick);
    };
  }, [ref]);
  return (
    <div className="relative">
      <div
        className={clsx(
          "absolute top-20 -right-4 menu bg-primary rounded-none z-[1] w-44 h-22 shadow",
          {
            hidden: !showMenu,
            block: showMenu,
          }
        )}
      >
        <div className="flex flex-col gap-4">
          <div
            onClick={() => {
              Cookies.remove("token");
              setTokenCookies(null);

              navigate("/");
            }}
            className="cursor-pointer text-white hover:bg-red-800 transition-colors px-4 py-2 w-full"
          >
            Logout
          </div>

          <Link
            className="cursor-pointer text-white hover:bg-red-800 transition-colors px-4 py-2 w-full"
            to={"/profile"}
          >
            Profile
          </Link>
        </div>
      </div>

      <div
        ref={ref}
        onClick={() => {
          setSwhoMenu(!showMenu);
        }}
        className="avatar placeholder cursor-pointer"
      >
        <div className="bg-neutral text-neutral-content w-16 rounded-full hover:text-primary hover:opacity-50 duration-500">
          <span className="text-xl">
            <UserIcon className="size-8" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;