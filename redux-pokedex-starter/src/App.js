import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import {connect} from "react-redux";

import { baseUrl } from './config';
import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';

const PrivateRoute = ({ component: Component, cProps, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} {...cProps} />
  )} />
)

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('state-pokedex-token');
    this.state = {
      loaded: false,
      token: props.authentication.token,
      needLogin: props.needLogin
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.loadPokemon();
  }

  handleCreated = (pokemon) => {
    this.setState({
      pokemon: [...this.state.pokemon, pokemon]
    });
  }

  async loadPokemon() {
    const response = await fetch(`${baseUrl}/pokemon`, {
      headers: { Authorization: `Bearer ${this.props.authentication.token}`}
    });
    if (response.ok) {
      const pokemon = await response.json();
      this.setState({
        pokemon,
        needLogin: false,
      });
    } else {
      this.setState({
        needLogin: true
      });
    }
  }


  render() {
    if (!this.state.loaded) {
      return null;
    }
    const cProps = {
      pokemon: this.state.pokemon,
      handleCreated: this.handleCreated,
      token: this.props.authentication.token
    };
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={LoginPanel} />
          <PrivateRoute path="/"
                        exact={true}
                        needLogin={this.props.needLogin}
                        component={PokemonBrowser}
                        cProps={cProps} />
          <PrivateRoute path="/pokemon/:pokemonId"
                        exact={true}
                        needLogin={this.props.needLogin}
                        component={PokemonBrowser}
                        cProps={cProps} />
        </Switch>
      </BrowserRouter>
    )
  }
}

const mapStateToProps = (state) =>{
  let needLogin = !state.authentication.token;
  return {
    authentication: state.authentication,
    needLogin: needLogin,
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{}
}


export default connect(mapStateToProps, mapDispatchToProps)(App)