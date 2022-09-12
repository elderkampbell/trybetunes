import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  state = {
    loading: true,
  };

  handleFavorite = async () => {
    this.setState({ loading: false });
    const { musics } = this.props;
    await getFavoriteSongs();
    await addSong(musics);
    this.setState({ loading: true });
  };

  render() {
    const { loading } = this.state;
    const { musics } = this.props;
    const { trackName, previewUrl, trackId } = musics;

    return (
      <div>
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <input
          type="checkbox"
          data-testid={ `checkbox-music-${trackId}` }
          id="music-checkbox"
          onChange={ this.handleFavorite }
        />
        {!loading && <Loading />}
      </div>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string.isRequired,
  trackName: PropTypes.string.isRequired,
  musics: PropTypes.isRequired,
};
