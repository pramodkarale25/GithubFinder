import axios from 'axios';
import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './component/layout/Navbar';
import Search from './component/users/Search';
import Users from './component/users/Users'
import Alert from './component/layout/Alert';
import about from './component/pages/about';
import User from './component/users/User';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    Alert: null
  }

  async componentDidMount() {
    // this.setState({ loading: true });
    // const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    // this.setState({ users: res.data, loading: false });
  }

  //search users with particular text
  searchUsers = async (text: string) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ users: res.data.items, loading: false });
  }

  //get user details for specific username
  getUser = async (username: string) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ user: res.data, loading: false });
  }

  //get repos details for specific username
  getUserRepos = async (username: string) => {
    this.setState({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}/repos?perpage=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    this.setState({ repos: res.data, loading: false });
  }

  //clear the users from state.
  ClearUsers = () => {
    this.setState({ users: [], loading: false });
  }

  //alert user to enter text while searching
  SetAlert = () => {
    this.setState({ Alert: 'Please enter search text' });
    setTimeout(() => this.setState({ Alert: null }), 3000);
  }

  render() {
    const { users, user, repos, loading } = this.state;

    return (
      <Router>
        <Navbar />
        <div className="container">
          {this.state.Alert !== null && (<Alert Alert={this.state.Alert} />)}
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={this.searchUsers} ShowClear={users.length > 0 ? true : false} ClearUsers={this.ClearUsers} SetAlert={this.SetAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )}>
            </Route>
            <Route exact path='/about' component={about}></Route>
            <Route exact path='/user/:login' render={props => (
              <User
                {...props}
                getUser={this.getUser}
                getUserRepos={this.getUserRepos}
                loading={loading}
                user={user}
                repos={repos}
              />
            )}>
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }
}

export default App;