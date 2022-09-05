import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Loading from '../Components/Loading';
import { createUser } from '../services/userAPI';

export default class Login extends Component {
  state = {
    userName: '',
    btnEnabler: true,
    loading: false,
    redirect: false,
  };

  btnValidation = () => {
    const minLength = 3;
    const { userName } = this.state;
    this.setState(userName.length >= minLength
      ? { btnEnabler: false } : { btnEnabler: true });
  };

  handleChange = ({ target: { value, name } }) => {
    this.setState({ [name]: value }, () => this.btnValidation());
  };

  handleClick = async () => {
    const { userName, loading, redirect } = this.state;
    this.setState({ loading: true });
    await createUser({ name: userName });
    this.setState({ redirect: true });
  };

  render() {
    const { userName, btnEnabler, loading, redirect } = this.state;

    return (
      redirect ? <Redirect to="/search" />
        : <div data-testid="page-login">
          {!loading
            ? (
              <form>
                <label htmlFor="login-name-input">
                  Nome:
                  <input
                    type="text"
                    name="userName"
                    data-testid="login-name-input"
                    value={ userName }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  type="button"
                  data-testid="login-submit-button"
                  disabled={ btnEnabler }
                  onClick={ this.handleClick }
                >
                  Entrar
                </button>
              </form>
            )
            : <Loading />}
        </div>
    );
  }
}
