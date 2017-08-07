import React from 'react';
import { readEndpoint } from 'redux-json-api';
import { connect } from 'react-redux';
import Box from './Box'
import Log from './Log'
import { JsonApiTypes } from '../api'
import { setCurrentPlayer, setGameLog } from '../actions'
import '../assets/Game.css';


class Game extends React.Component {
  componentWillMount() {
    const { dispatch } = this.props
    dispatch(readEndpoint(`games/${this.props.match.params.id}/`, {
      onSuccess: json => {
        dispatch(setCurrentPlayer(json.data.attributes.next_player))
        dispatch(setGameLog(json.data.attributes.game_log))
      }
    }));
  }

  renderWinner() {
    const { winner } = this.props
    return (
      <h2 className={`player${winner.toUpperCase()}`}>
        Player {winner.toUpperCase()} won the party !
      </h2>
    )
  }

  renderCurrentPlayer() {
    let { currentPlayer } = this.props

    return (
      <h2 className={`player${currentPlayer.toUpperCase()}`}>
        Player {currentPlayer.toUpperCase()} turn
      </h2>
    )
  }

  renderBox = ([box, player]) => (<Box
    key={`box-${box}`}
    box={box}
    player={player}
    game={this.props.match.params.id}
  />);

  renderLog = event => <Log event={event} key={`log-${event}`} />;

  render() {
    const {
      game_state: gameState = {},
      winner,
      gameLog
    } = this.props;

    return (
      <div>
        <div className="App-header">
          <h1>Game #{this.props.id}</h1>
          {winner ? this.renderWinner() : this.renderCurrentPlayer()}
        </div>
        <div className="ticTacToe">
          {Object.entries(gameState).map(this.renderBox)}
        </div>
        <ul>
          {gameLog.map(this.renderLog)}
        </ul>
      </div>
    )
  };
}

const mapStateToProps = ({
    currentPlayer,
    winner,
    api: { [JsonApiTypes.game]: { data=[{}, ] } = {} },
    gameLog
  }) => {
    const { id, attributes = {} } = data[0]
    attributes.winner = winner || attributes.winner
    return { id, currentPlayer, gameLog, winner, ...attributes }
};

export default connect(mapStateToProps)(Game);
