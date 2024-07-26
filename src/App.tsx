import React, { useEffect } from "react";

import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Comics from "./pages/Comics";
import Characters from "./pages/Characters";
import SignUp from "./pages/SignUp";
import Footer from "./components/Footer";
import Comic from "./pages/Comic";
import Character from "./pages/Character";
import ToastCaller from "./components/ToastCaller";
import Login from "./Login";
import { useTokenCookiesStore } from "./stores/tokenCookies";
import Cookies from "js-cookie";
import { useOpenModalStore } from "./stores/openModal";
import ModalLogin from "./components/Form/ModalLogin";
import Profile from "./pages/Profile";
import { useCurrentAvatarStore } from "./stores/currentAvatar";
import { baseAPIUrl } from "./api";

function App() {
  const { setTokenCookies } = useTokenCookiesStore();
  const { openModal, setOpenModal } = useOpenModalStore();
  const { currentAvatar, setCurrentAvatar } = useCurrentAvatarStore();

  useEffect(() => {
    const cookies = Cookies.get("token");

    cookies && setTokenCookies(cookies);
    const fetchAvatar = async () => {
      const response = await fetch(`${baseAPIUrl}/user/avatar`, {
        headers: {
          Authorization: `Bearer ${cookies}`,
        },
      });

      const data = await response.json();
      setCurrentAvatar(data.avatar);
    };
    !currentAvatar && fetchAvatar();
  }, [currentAvatar]);
  return (
    <>
      <Router>
        {openModal && <ModalLogin />}
        <ToastCaller />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/comic/:id" element={<Comic />}></Route>
          <Route path="/characters" element={<Characters />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
