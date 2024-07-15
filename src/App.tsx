import React from "react";

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

function App() {
  return (
    <>
      <Router>
        <ToastCaller />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/comics" element={<Comics />}></Route>
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
