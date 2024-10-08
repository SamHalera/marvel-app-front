import { useState } from "react";
import logo from "../assets/images/logo.svg";
import { useNavigate } from "react-router-dom";

import { useTokenCookiesStore } from "../stores/tokenCookies";

import ProfileDropdown from "./Profile/ProfileDropdown";
import DesktopNav from "./MenuNav/DesktopNav";
import MobileNav from "./MenuNav/MobileNav";

const Header = () => {
  const [showMenu, setSwhoMenu] = useState<boolean>(false);

  const { tokenCookies } = useTokenCookiesStore();

  const navigate = useNavigate();

  return (
    <>
      <header className="fixed top-0 z-40 flex w-full items-center justify-between px-6 md:px-12 py-5">
        <img
          onClick={() => {
            navigate("/");
          }}
          className="logo w-24 md:w-36 cursor-pointer"
          src={logo}
          alt=""
        />
        <div className="flex justify-between items-center gap-3">
          <MobileNav tokenCookies={tokenCookies ?? null} />
          <DesktopNav tokenCookies={tokenCookies ?? null} />

          {tokenCookies && (
            <ProfileDropdown showMenu={showMenu} setSwhoMenu={setSwhoMenu} />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
