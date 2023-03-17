import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "../App.css";
import axios from "axios";

const Highscores = () => {
  const [highscores, setHighscores] = useState(null);

  useEffect(() => {
    getHighscores();
  }, []);

  const navigate = useNavigate();

  const getHighscores = async () => {
    axios
      .get(
        "https://my-json-server.typicode.com/Serapion-ZG/hangman-ts/highscores"
      )
      .then((response) => {
        console.log(response.data);
        setHighscores(
          response.data.sort((a, b) => {
            let scoreA = 100 / (1 + a.errors);
            let scoreB = 100 / (1 + b.errors);
            if (scoreA > scoreB) {
              return -1;
            }
            if (scoreA < scoreB) {
              return 1;
            }
            // a must be equal to b
            return 0;
          })
        );
      });
  };

  return (
    <>
      <div>
        {highscores && (
          <>
            <h1>Highscores</h1>
            <ul>
              {highscores.map((item) => {
                return (
                  <li>
                    {item.userName} {100 / (1 + item.errors)}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Play again
        </button>
      </div>
    </>
  );
};

export default Highscores;
