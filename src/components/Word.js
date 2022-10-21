import React from "react";

const Word = ({ selectedWord, correctLetters }) => {
  var track = 0;
  return (
    <div className="word">
      {selectedWord.split("").map((letter, i) => {
        if (letter === " ") {
          track = track + 1;
          if (track === 5) {
            track = 0;
            return <br />;
          }
          return <span className="space"> </span>;
        }
        if (letter === ".") return <span className="space">.</span>;
        if (letter === ",") return <span className="space">,</span>;
        if (letter === "!") return <span className="space">!</span>;
        if (letter === "?") return <span className="space">?</span>;
        if (letter === "-") return <span className="space">-</span>;
        if (letter === ";") return <span className="space">;</span>;
        if (letter === "'") return <span className="space">'</span>;
        if (letter === ":") return <span className="space">:</span>;
        if (letter === "...") return <span className="space">...</span>;

        return (
          <span className="letter" key={i}>
            {correctLetters.includes(letter) ? letter : ""}
          </span>
        );
      })}
    </div>
  );
};

export default Word;
