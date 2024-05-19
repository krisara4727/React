import React from "react";
import {
  winnerName,
  gameOverStatus,
  player1Turn,
  player2Turn,
} from "../constants";

function WinningStatus({ gameOver, player1 }) {
  return (
    <p className="game__status__text">
      {gameOver.win
        ? gameOverStatus + (player1 ? " Player X " : " Player O ") + winnerName
        : gameOver.draw
        ? "X&O Draw"
        : player1
        ? player1Turn
        : player2Turn}
    </p>
  );
}

export default WinningStatus;
