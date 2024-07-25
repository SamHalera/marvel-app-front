import { MouseEvent, useEffect, useRef, useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ModalLogin from "./Form/ModalLogin";
import { useTokenCookiesStore } from "../stores/tokenCookies";
import Cookies from "js-cookie";
import clsx from "clsx";
import menuItems from "../assets/data/menuItems.json";
import { useOpenModalStore } from "../stores/openModal";

import ProfileDropdown from "./Profile/ProfileDropdown";

const Header = () => {
  const [showMenu, setSwhoMenu] = useState<boolean>(false);
  const { tokenCookies } = useTokenCookiesStore();
  const { openModal, setOpenModal } = useOpenModalStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      {/* {openModal && (
        <ModalLogin openModal={openModal} setOpenModal={setOpenModal} />
      )} */}
      <header className="fixed top-0 z-40 flex w-full items-center justify-between px-12 py-5">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="logo w-24 md:w-36 cursor-pointer"
          src={logo}
          alt=""
        />
        <div className="flex justify-between">
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

            <div className="flex gap-4">
              {tokenCookies ? (
                <ProfileDropdown
                  showMenu={showMenu}
                  setSwhoMenu={setSwhoMenu}
                />
              ) : (
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
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
