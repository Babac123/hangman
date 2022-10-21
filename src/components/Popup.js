import React, { useEffect, useState } from "react";
import { checkWin } from "../helpers/helpers";
import { useNavigate } from "react-router-dom";


const Popup = ({
  correctLetters,
  wrongLetters,
  selectedWord,
  setPlayable,
  playAgain,
  sendHighscore,
  getHighscore,
  setEndTime
}) => {
  const [finalMessage, setFinalMessage] = useState("")

  useEffect(() => {
    let playable = true;
    if (checkWin(correctLetters, wrongLetters, selectedWord) === "win") {
      setFinalMessage("Congratulations! You won!");
      playable = false;
      setEndTime(Date.now())
    } else if (checkWin(correctLetters, wrongLetters, selectedWord) === "lose") {
      setFinalMessage("Unfortunately you lost.");
      playable = false;
    }

    setPlayable(playable);
  }, [correctLetters, wrongLetters]);

  const navigate = useNavigate();

  return (
    <div
      className="popup-container"
      style={finalMessage !== "" ? { display: "flex" } : {}}
    >
      <div className="popup">
        <h2>{finalMessage}</h2>
        <button className="button-margin" onClick={() => {
          playAgain()
          setFinalMessage("")
        }}>Play Again</button>
        <button onClick={() => { sendHighscore(); navigate("/highscores"); }}>Submit score</button>
      </div>
    </div>
  );
};

export default Popup;
