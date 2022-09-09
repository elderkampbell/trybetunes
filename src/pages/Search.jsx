import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Components/Header';
import Loading from '../Components/Loading';
import searchAlbumsAPIs from '../services/searchAlbumsAPI';

export default class Search extends Component {
  state = {
    artistName: '',
    btnEnabler: true,
    loading: true,
    artistInfo: [],
    searched: false,
    searchedArtist: '',
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

  handleClick = async () => {
    this.setState({ loading: false });
    const { artistName } = this.state;
    const api = await searchAlbumsAPIs(artistName);
    this.setState((prevState) => ({
      artistName: '',
      btnEnabler: true,
      loading: true,
      searched: true,
      searchedArtist: prevState.artistName,
      artistInfo: api,
    }));
  };

  render() {
    const { artistName,
      btnEnabler,
      artistInfo,
      loading,
      searched,
      searchedArtist } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {
          loading
            ? (
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
                  onClick={ this.handleClick }
                >
                  Pesquisar
                </button>

              </form>) : <Loading />

        }
        {
          searched
          && (
            <>
              <p>
                {`Resultado de álbuns de: ${searchedArtist}`}
              </p>
              {
                artistInfo.length !== 0 ? (
                  <div>
                    { artistInfo.map((album) => (
                      <Link
                        to={ `/album/${album.collectionId}` }
                        key={ album.collectionId }
                        data-testid={ `link-to-album-${album.collectionId}` }
                      >
                        <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                        <p>
                          { album.artistName }
                        </p>
                        <p>
                          {' '}
                          { album.collectionName }
                        </p>
                      </Link>
                    )) }
                  </div>) : <p>Nenhum álbum foi encontrado</p>
              }
            </>)
        }
      </div>
    );
  }
}
