import React from "react";
import menuItems from "../../assets/data/menuItems.json";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import { useOpenModalStore } from "../../stores/openModal";
const DesktopNav = ({ tokenCookies }: { tokenCookies: string | null }) => {
  const { pathname } = useLocation();
  const { openModal, setOpenModal } = useOpenModalStore();
  return (
    <nav className="mr-5 hidden items-center gap-10 md:flex">
      <div className="flex gap-4">
        {menuItems
          .filter((item) => {
            if (!tokenCookies) {
              return !item.isPrivate;
            }
            return item;
          })
          .map((item) => {
            return (
              <Link
                className={clsx(
                  "text-xl text-white hover:text-primary transition-colors",
                  {
                    "text-primary": pathname === item.href,
                  }
                )}
                key={item.label}
                to={item.href}
              >
                {item.label}
              </Link>
            );
          })}
      </div>

      {!tokenCookies && (
        <div className="flex gap-4">
          <>
            <Link
              className={clsx(
                "text-xl text-white hover:text-primary transition-colors",
                {
                  "text-primary": pathname === "/signup",
                }
              )}
              to={"/signup"}
            >
              Signup
            </Link>
            <div
              onClick={() => {
                setOpenModal(true);
              }}
              className=" cursor-pointer text-xl text-white hover:text-primary transition-colors"
            >
              Login
            </div>
          </>
        </div>
      )}
    </nav>
  );
};

export default DesktopNav;
