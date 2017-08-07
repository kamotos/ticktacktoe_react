import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { createResource } from 'redux-json-api'
import { JsonApiTypes } from '../api'

class Home extends React.Component {
  createGame() {
    const { dispatch, history } = this.props
    const game = {
      type: JsonApiTypes.game,
      attributes: {},
    }

    dispatch(
      createResource(game, {
        onSuccess: json => history.push(`/${json.data.id}`)
      })
    );
  }

  render() {
    return (
      <p className="App-intro">
        <button onClick={this.createGame.bind(this)}>Start a new game</button>
      </p>
    )
  }
}

export default withRouter(connect()(Home))
