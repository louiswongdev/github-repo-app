import React from 'react';
import PropTypes from 'prop-types';
import { FaUserFriends, FaFighterJet, FaTrophy } from 'react-icons/fa';

function Instructions() {
  return (
    <div className="instructions-container">
      <h1 className="center-text header-lg">Instructions</h1>
      <ol className="container-sm grid center-text battle-instructions">
        <li>
          <h3 className="header-sm">Enter two Github users</h3>
          <FaUserFriends
            className="bg-light"
            color="rgb(255, 191, 116)"
            size={140}
          />
        </li>
        <li>
          <h3 className="header-sm">Battle</h3>
          <FaFighterJet className="bg-light" color="#727272" size={140} />
        </li>
        <li>
          <h3 className="header-sm">See the winners</h3>
          <FaTrophy className="bg-light" color="rgb(255, 215, 0)" size={140} />
        </li>
      </ol>
    </div>
  );
}

class PlayerInput extends React.Component {
  state = {
    username: ''
  };

  handleChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  handleSubmit = e => {
    event.preventDefault();

    this.props.onSubmit(this.state.username);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="column player">
        <label htmlFor="username" className="player-label">
          {this.props.label}
        </label>
        <div className="row player-inputs">
          <input
            type="text"
            id="username"
            className="input-light"
            placeholder="github username"
            autoComplete="off"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <button
            className="btn btn-dark"
            type="submit"
            disabled={!this.state.username}
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

export default class Battle extends React.Component {
  state = {
    playerOne: null,
    playerTwo: null
  };

  handleSubmit = (id, player) => {
    this.setState({
      [id]: player
    })
  }

  render() {
    const { playerOne, playerTwo } = this.state;

    return (
      <React.Fragment>
        <Instructions />

        <div className="players-container">
          <h1 className="center-text header-lg">Players</h1>
          <div className="row space-around">
            {playerOne === null && (
              <PlayerInput
                label="Player One"
                onSubmit={player => this.handleSubmit('playerOne', player)}
              />
            )}

            {playerTwo === null && (
              <PlayerInput
                label="Player Two"
                onSubmit={player => this.handleSubmit('playerTwo', player)}
              />
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}

PlayerInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired
};
