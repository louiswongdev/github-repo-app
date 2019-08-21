import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';

function LanguagesNav({ selected, onUpdateLanguage }) {
  const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

  return (
    <ul className="flex-center">
      {languages.map(language => (
        <li key={language}>
          <button
            onClick={() => onUpdateLanguage(language)}
            style={language === selected ? { color: 'rgb(187, 46, 31)' } : null}
            className="btn-clear nav-link"
          >
            {language}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default class Popular extends React.Component {
  state = {
    selectedLanguage: 'All',
    repos: null,
    error: null
  };

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage)
  }

  updateLanguage = selectedLanguage => {
    this.setState({
      selectedLanguage,
      error: null,
      repos: null
    });

    fetchPopularRepos(selectedLanguage)
      .then(repos =>
        this.setState({
          repos,
          error: null
        })
      )
      .catch(() => {
        console.warn('Error fetching repos: ', error);

        this.setState({
          error: `There was an error fetching the repositories`
        });
      });
  };

  isLoading() {
    return this.state.repos === null && this.state.error === null;
  }

  render() {
    const { selectedLanguage, repos, error } = this.state;

    return (
      <>
        <LanguagesNav
          selected={selectedLanguage}
          onUpdateLanguage={this.updateLanguage}
        />

        {this.isLoading() && <p>LOADING</p>}

        {error && <p>{error}</p>}

        {repos && <pre>{JSON.stringify(repos, null, 2)}</pre>}
      </>
    );
  }
}

LanguagesNav.propTypes = {
  selected: PropTypes.string.isRequired,
  onUpdateLanguage: PropTypes.func.isRequired
};
