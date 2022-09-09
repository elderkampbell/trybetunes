import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

export default class Header extends Component {
  state = {
    name: '',
    loading: true,
  };

  componentDidMount() {
    getUser().then((userInfo) => {
      this.setState({ name: userInfo.name, loading: false });
    });
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading
          ? <Loading />
          : <p data-testid="header-user-name">{ name }</p> }
        <Link to="/search" data-testid="link-to-search">
          Pesquisar
        </Link>

        <Link to="/favorites" data-testid="link-to-favorites">
          Favoritos
        </Link>

        <Link to="/profile" data-testid="link-to-profile">
          Pesquisar
        </Link>
      </header>
    );
  }
}
