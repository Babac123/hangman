import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Figure from "./components/Figure";
import WrongLetters from "./components/WrongLetters";
import Word from "./components/Word";
import Popup from "./components/Popup";
import store from "./redux/store";

import Signup from "./components/SignUpPage";
import Main from "./components/MainPage";
import Highscores from "./components/HighscoresPage";

import "./App.css";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App"></div>

        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/highscores" element={<Highscores />} />
        </Routes>
      </Router>
    </Provider>
  );
}
