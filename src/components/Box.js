import React from 'react';
import { connect } from 'react-redux';
import { createResource } from 'redux-json-api'
import { JsonApiTypes } from '../api'
import { appendGameLog, changePlayer, checkBox, setWinner } from '../actions'

const PLAYERS_MAP = {a: 'O', b: 'X'}

class Box extends React.Component {
  play() {
    // Box already played. Do nothing.
    const { box, dispatch, player, currentPlayer } = this.props
    if (player)
      return

    const action = {
      type: JsonApiTypes.action,
      attributes: {
        box,
        player: currentPlayer,
        game: {
          type: JsonApiTypes.game,
          id: this.props.game
        }
      },
    };

    dispatch(createResource(action, {
      onSuccess: json => {
        const { is_winning_move: isWiningMove } = json.data.attributes
        dispatch(checkBox({ box, player: currentPlayer}))
        dispatch(appendGameLog(json.data.attributes.__str__))

        if (isWiningMove)
          dispatch(setWinner(json.data.attributes.player))
        else
          dispatch(changePlayer(json.data.attributes.player))
      }
    }))
  }

  getClassName() {
    const { player = "" } = this.props
    return `square player${(player || "").toUpperCase()}`;
  }

  render() {
    return (
      <span className={this.getClassName()} onClick={this.play.bind(this)}>
        {PLAYERS_MAP[this.props.player]}
      </span>
    );
  }
}

const mapStateToProps = ({
    api: { [JsonApiTypes.action]: { data = [{}] } = {} },
    currentPlayer,
    gameState
  }, ownProps) => {
    // Existing instance
    const { id, attributes = {} } = data[0]
    const { box } = attributes
    let { player } = ownProps
    if (parseInt(ownProps.box, 10) === box) {
      return { id, currentPlayer, ...attributes }
    }

    const boxPlayer = gameState[ownProps.box]
    if (['a', 'b'].includes(boxPlayer))
      player = boxPlayer
    return Object.assign({}, ownProps, { player, currentPlayer })
};

export default connect(mapStateToProps)(Box);
