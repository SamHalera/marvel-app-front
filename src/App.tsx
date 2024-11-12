import { useEffect, useState } from "react";

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
import { useCurrenUserStore } from "./stores/currentUser";
import Favorites from "./pages/Favorites";
import ScrollToTop from "./components/ScrollToTop";
import ForgottenPass from "./pages/ForgottenPass";
import ResetPassword from "./pages/ResetPassword";
import Test from "./pages/Test";
import ModalVisitorOptionInformation from "./components/Form/ModalVisitorInformation";

function App() {
  const [scrollToTopHidden, setScrollToTopHidden] = useState<boolean>(true);
  const { setTokenCookies } = useTokenCookiesStore();
  const { openModal, openModalVisitorInformation } = useOpenModalStore();
  const {
    currentAvatar,
    setCurrentAvatar,
    setCurrentEmail,
    setCurrentUsername,
    currentUsername,
  } = useCurrenUserStore();

  useEffect(() => {
    const cookies = Cookies.get("token");

    cookies && setTokenCookies(cookies);
    const fetchCurrentUser = async () => {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/user/profile`,
        {
          headers: {
            Authorization: `Bearer ${cookies}`,
          },
        }
      );

      const data = await response.json();
      setCurrentEmail(data.email);
      setCurrentUsername(data.username);
      setCurrentAvatar(data.avatar);
    };
    !currentAvatar && fetchCurrentUser();
    const handleScrollToTop = () => {
      if (window.scrollY > 400) {
        setScrollToTopHidden(false);
      } else {
        setScrollToTopHidden(true);
      }
    };

    window.addEventListener("scroll", handleScrollToTop);

    return () => {
      window.removeEventListener("scroll", handleScrollToTop);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentAvatar]);
  return (
    <>
      <Router>
        {openModal && <ModalLogin />}
        {openModalVisitorInformation && <ModalVisitorOptionInformation />}
        <ToastCaller />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
          <Route path="/test/characters" element={<Test />}></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/comic/:id" element={<Comic />}></Route>
          <Route path="/characters" element={<Characters />}></Route>
          <Route path="/character/:id" element={<Character />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/forgotten-password" element={<ForgottenPass />}></Route>
          <Route path="/reset-password" element={<ResetPassword />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        {!scrollToTopHidden && (
          <ScrollToTop setScrollToTopHidden={setScrollToTopHidden} />
        )}
        <Footer />
      </Router>
    </>
  );
}

export default App;
