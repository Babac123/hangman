import React, { useEffect, useState } from "react";
import app from "../config/firebase";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Header from "./Header";
import { useNavigate } from "react-router-dom";

export default function Highscores() {
  const [highscores, setHighscores] = useState([]);

  const db = getFirestore(app);

  const fetchHighscores = async () => {
    let scores = [];
    const querySnapshot = await getDocs(collection(db, "highscores"));
    querySnapshot.forEach(async (doc) => {
      const data = await doc.data();
      scores.push(data);
    });

    return scores;
  };

  useEffect(() => {
    fetchHighscores().then((data) => setHighscores(data));
  }, []);

  const navigate = useNavigate();


  return (
    <>
      <h2>Highscores</h2>
      <ol className="orderedList">
        {highscores
          .sort((a, b) => (a.score - b.score))
          .map((data, idx) => (
            <li className="orderedListItems" key={idx}>
              {data.name} - {data.score} s
            </li>
          ))}
      </ol>
      <button className="button-margin"
        onClick={() => {
          navigate("/");
        }}
      >Play Again</button>
    </>
  );
}
