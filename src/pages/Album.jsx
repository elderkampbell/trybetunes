import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../Components/MusicCard';

export default class Album extends Component {
  state = {
    artistName: '',
    collectionName: '',
    data: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const data = await getMusics(id);

    this.setState({
      artistName: data[0].artistName,
      collectionName: data[0].collectionName,
      data: data.filter(
        (music) => music.kind,
      ),
    });
  }

  render() {
    const { artistName, collectionName, data } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ artistName }</h2>
          <h3 data-testid="album-name">{ collectionName }</h3>
          {
            data.map((music) => (
              <MusicCard
                key={ music.trackId }
                trackName={ music.trackName }
                trackUrl={ music.previewUrl }
                musics={ music }
              />
            ))
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }),
}.isRequired;
