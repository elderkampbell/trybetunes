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
    const { artistName } = this.state;
    this.setState({ loading: false });
    const api = await searchAlbumsAPIs(artistName);
    this.setState({ artistInfo: api });
    console.log(api);
    // this.setState({ redirect: true });
  };

  // componentDidMount() {
  //   getUser().then((userInfo) => {
  //     this.setState({ name: userInfo.name, loading: false });
  //   });
  // }

  render() {
    const { artistName, btnEnabler, artistInfo, loading, searched } = this.state;
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

          searched && artistInfo.length === 0 ? (
            <div>
              { artistInfo.map((album) => (
                <Link
                  to={ `/album/${album.collectionId}` }
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
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
            </div>)
        }
      </div>
    );
  }
}
