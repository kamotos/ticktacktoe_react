// Action types
const CHECK_BOX = "CHECK_BOX";

const SET_CURRENT_PLAYER = "SET_CURRENT_PLAYER";
const CHANGE_CURRENT_PLAYER = "CHANGE_CURRENT_PLAYER";
export const SET_WINNER = "SET_WINNER"

export const APPEND_GAMELOG = "APPEND_GAMELOG"
export const SET_GAMELOG = "SET_GAMELOG"

export function checkBox({ box, player }) {
  return { type: CHECK_BOX, box, player}
}

export function changePlayer(currentPlayer)  {
  return {
    type: CHANGE_CURRENT_PLAYER,
    currentPlayer
  }
}

export function setCurrentPlayer(currentPlayer)  {
  return {
    type: SET_CURRENT_PLAYER,
    currentPlayer
  }
}

export function setWinner(winner)  {
  return {
    type: SET_WINNER,
    winner
  }
}

export function setGameLog(gameLog) {
  return {
    type: SET_GAMELOG,
    gameLog
  }
}

export function appendGameLog(gameLog) {
  return {
    type: APPEND_GAMELOG,
    gameLog
  }
}
