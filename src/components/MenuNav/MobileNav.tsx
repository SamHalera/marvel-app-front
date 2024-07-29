import React, { useState } from "react";
import menuItems from "../../assets/data/menuItems.json";
import { Link, useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";

import { useOpenModalStore } from "../../stores/openModal";
import { Bars3Icon, XCircleIcon } from "@heroicons/react/24/solid";

const MobileNav = ({ tokenCookies }: { tokenCookies: string | null }) => {
  const [showMobileNav, setSwhoMobileNav] = useState<boolean>(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { openModal, setOpenModal } = useOpenModalStore();
  return (
    <div>
      <Bars3Icon
        onClick={() => {
          setSwhoMobileNav(!showMobileNav);
        }}
        className="size-8 md:hidden"
      />

      <nav
        className={clsx({
          hidden: !showMobileNav,
          "fixed bg-blue-950 bottom-0 left-0 right-0 top-0 z-50 flex h-full w-full":
            showMobileNav,
        })}
      >
        <XCircleIcon
          onClick={() => {
            setSwhoMobileNav(false);
          }}
          className="absolute size-10 right-8 top-8"
        />

        <div className="flex flex-col items-center m-auto justify-center gap-8">
          {menuItems
            .filter((item) => {
              if (!tokenCookies) {
                return !item.isPrivate;
              }
              return item;
            })
            .map((item) => {
              return (
                <div
                  onClick={() => {
                    setSwhoMobileNav(false);
                    navigate(item.href);
                  }}
                  className={clsx(
                    " text-white hover:text-primary transition-colors text-3xl",
                    {
                      "text-primary": pathname === item.href,
                    }
                  )}
                  key={item.label}
                >
                  {item.label}
                </div>
              );
            })}

          {!tokenCookies && (
            <>
              <div
                onClick={() => {
                  setSwhoMobileNav(false);
                  navigate("/signup");
                }}
                className={clsx(
                  "text-3xl text-white hover:text-primary transition-colors",
                  {
                    "text-primary": pathname === "/signup",
                  }
                )}
              >
                Signup
              </div>
              <div
                onClick={() => {
                  setOpenModal(true);
                  setSwhoMobileNav(false);
                }}
                className=" cursor-pointer text-3xl text-white hover:text-primary transition-colors"
              >
                Login
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default MobileNav;
