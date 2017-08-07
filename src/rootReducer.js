import { combineReducers } from 'redux';
import { reducer as api } from 'redux-json-api';
import { JsonApiTypes } from './api'
import { SET_WINNER, SET_GAMELOG, APPEND_GAMELOG } from './actions'

const nextPlayerMap = {a: 'b', b: 'a'}

const currentPlayer = (state = '', action) => {
  switch (action.type) {
    case "API_CREATED":
      if (action.payload.data.type === JsonApiTypes.action)
        return nextPlayerMap[action.payload.data.attributes.player]
      return state
    case 'SET_CURRENT_PLAYER':
      let { currentPlayer } = action
      return currentPlayer
    default:
      return state
  }
};

const gameInitialState = {
  1: null, 2: null, 3: null,
  4: null, 5: null, 6: null,
  7: null, 8: null, 9: null,
}

const gameState = (state = gameInitialState, action) => {
  const { data = {} } = action.payload || {}
  const { attributes } = data
  switch (action.type) {
    case 'API_READ':
      if (data.type === JsonApiTypes.game)
        return attributes.game_state
      return state
    case "API_CREATED":
      if (data.type === JsonApiTypes.action)
        return Object.assign({}, state, {
          [attributes.box]: attributes.player
        })
      return state
    default:
      return state
  }
}

const winner = (state = "", action) => {
  switch (action.type) {
    case SET_WINNER:
      return action.winner
    default:
      return state
  }
}

const gameLog = (state = [], action) => {
  switch (action.type) {
    case SET_GAMELOG:
      return action.gameLog
    case APPEND_GAMELOG:
        const newState = Array.prototype.slice.apply(state)
        newState.push(action.gameLog)
        return newState
    default:
      return state
  }
}

export default combineReducers({
  api,
  currentPlayer,
  gameLog,
  gameState,
  winner
})
