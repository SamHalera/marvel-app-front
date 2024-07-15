import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import ModalLogin from "./Form/ModalLogin";

const Header = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <>
      <ModalLogin openModal={openModal} setOpenModal={setOpenModal} />
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
          <nav className="mr-5 hidden items-center gap-6 md:flex">
            <Link
              className="text-xl text-white hover:text-primary transition-colors"
              to="/"
            >
              Home
            </Link>
            <Link
              className="text-xl text-white hover:text-primary transition-colors"
              to="/characters"
            >
              Characters
            </Link>
            <Link
              className="text-xl text-white hover:text-primary transition-colors"
              to="/comics"
            >
              Comics
            </Link>

            <Link
              className="text-xl text-white hover:text-primary transition-colors"
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
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
