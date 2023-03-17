export function checkWin(correct, wrong, word) {
  let status = "win";

  // Check for win
  word.split("").forEach((letter) => {
    if (letter === ".") return;
    if (letter === ",") return;
    if (letter === "!") return;
    if (letter === "?") return;
    if (letter === "-") return;
    if (letter === ";") return;
    if (letter === "'") return;
    if (letter === ":") return;
    if (letter === "...") return;
    if (letter === " ") return;

    if (!correct.includes(letter)) {
      status = "";
    }
  });

  // Check for lose
  if (wrong.length === 6) status = "lose";

  return status;
}
