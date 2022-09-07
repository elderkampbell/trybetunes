import React, { Component } from 'react';
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
          : <p>{ name }</p> }
      </header>
    );
  }
}
