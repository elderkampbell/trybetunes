import React, { Component } from 'react';
import Header from '../Components/Header';

export default class Search extends Component {
  state = {
    artistName: '',
    btnEnabler: true,
  };

  btnValidation = () => {
    const minLength = 2;
    const { artistName } = this.state;
    this.setState(artistName.length >= minLength
      ? { btnEnabler: false } : { btnEnabler: true });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.btnValidation());
  };

  render() {
    const { artistName, btnEnabler } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>

          <label htmlFor="search-artist-input">
            Nome do artista
            <input
              type="text"
              name="artistName"
              data-testid="search-artist-input"
              value={ artistName }
              onChange={ this.handleChange }
            />
          </label>

          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ btnEnabler }
          >
            Pesquisar
          </button>

        </form>
      </div>
    );
  }
}
