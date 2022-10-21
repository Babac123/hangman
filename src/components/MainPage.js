import React, { useState, useEffect } from "react";
import Header from "./Header";
import Figure from "./Figure";
import WrongLetters from "./WrongLetters";
import Word from "./Word";
import Popup from "./Popup";
import "../App.css";

import axios from "axios";

import { useSelector } from "react-redux";

import {
    BrowserRouter as Router,

} from "react-router-dom";

export default function Main() {
    const [playable, setPlayable] = useState(true);
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [correctLetters, setCorrectLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [newQuote, setNewQuote] = useState(null);
    const [newQuoteId, setNewQuoteId] = useState(null)

    const user = useSelector((state) => state.user);

    useEffect(() => {
        !newQuote && getNewQuote();
        console.log(newQuote);
        console.log(user)
    }, [newQuote, user]);

    const getNewQuote = async () => {
        axios.get("https://api.quotable.io/random").then((response) => {
            console.log(response.data)
            setNewQuote(response.data.content.toLowerCase())
            setNewQuoteId(response.data._id)
            setStartTime(Date.now())
        });
    };

    const findUnique = (str) => {
        // Split the string to make array
        str.split('').forEach(letter => {
            if (letter === ".") return
            if (letter === ",") return
            if (letter === "!") return
            if (letter === "?") return
            if (letter === "-") return
            if (letter === ";") return
            if (letter === "'") return
            if (letter === ":") return
            if (letter === "...") return
            if (letter === " ") return
            return letter
        })
        // Create a set using array
        str = new Set(str);
        return str;
    }

    const submitHighscore = async () => {
        const duration = endTime - startTime;
        const unique = findUnique(newQuote)

        console.log("Unique>", unique.size)

        axios.post("https://my-json-server.typicode.com/Serapion-ZG/hangman-ts/highscores",

            {
                quoteId: newQuoteId,
                length: newQuote.length,
                userName: user,
                errors: wrongLetters.length,
                duration: duration,
                uniqueCharacters: unique.size
            }

        ).then(response => {
            console.log("response", response)
        })
    }

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
        submitHighscore()
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
};
