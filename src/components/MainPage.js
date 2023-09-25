import React, { useState, useEffect } from "react";
import Header from "./Header";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import Popup from "./Popup";
import "../App.css";

import app from "../config/firebase";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import axios from "axios";

import { useSelector } from "react-redux";

export default function Main() {
  const [playable, setPlayable] = useState(true);
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [newQuote, setNewQuote] = useState(null);

  const user = useSelector((state) => state.user);
  const db = getFirestore(app);

  useEffect(() => {
    !newQuote && getNewQuote();
    console.log(newQuote);
    console.log(user);
  }, [newQuote, user]);

  const getNewQuote = async () => {
    axios.get("https://api.quotable.io/random").then((response) => {
      console.log(response.data);
      setNewQuote(response.data.content.toLowerCase());
      setStartTime(Date.now());
    });
  };



  const submitHighscore = async (name, score) => {
    try {
      const docRef = await addDoc(collection(db, "highscores"), {
        name,
        score,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    const handleKeydown = (event) => {
      console.log(newQuote, event.key);
      const { key, keyCode } = event;
      if (playable && keyCode >= 65 && keyCode <= 90) {
        const letter = key.toLowerCase();
        console.log(letter);
        if (newQuote.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            setCorrectLetters((currentLetters) => [...currentLetters, letter]);
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            setWrongLetters((currentLetters) => [...currentLetters, letter]);
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeydown);

    return () => window.removeEventListener("keydown", handleKeydown);
  }, [correctLetters, wrongLetters, playable, newQuote]);

  function playAgain() {
    setPlayable(true);

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    getNewQuote();
  }

  function sendHighscore() {
    submitHighscore(user, (endTime - startTime)/1000);
  }

  return (
    <>
      <Header />
      <p>name: {user}</p>
      <button onClick={playAgain}>Restart</button>

      {newQuote && (
        <>
          <div className="game-container mb-5">
            <Figure wrongLetters={wrongLetters} />
            <WrongLetters wrongLetters={wrongLetters} />
          </div>
          <div className="margin-bot">
            <Word selectedWord={newQuote} correctLetters={correctLetters} />
          </div>

          <Popup
            correctLetters={correctLetters}
            wrongLetters={wrongLetters}
            selectedWord={newQuote}
            setPlayable={setPlayable}
            playAgain={playAgain}
            sendHighscore={sendHighscore}
            setEndTime={setEndTime}
          />
        </>
      )}
    </>
  );
}
