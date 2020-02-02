import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom';

import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';

import { getcookie } from './components/get_cookie_function';

import Read from './pages/read';
import Template from './pages/template';
import Create from './pages/create';
import Detail from './pages/detail';
import LoginApp from './pages/login';
import LogoutApp from './pages/logout';
import SignupApp from './pages/signup';
import { Rete2 } from './rete/rete';

import logo from './img/logo.svg'
import title from './img/title.svg'

//readPage
const ReadPage = () => {
  return (
    <div>
      <div className='header'>
        <div className='header_menu'>
          <div className='logo_box'><img src={logo} className="app_logo" alt="app_logo" /><img src={title} className="app_title" alt="title" /></div>
          <LogoutApp />
        </div>
      </div>
      <div className="main">
        <Read />
      </div >
    </div >
  )
}

//TemplatePage
class TemplatePage extends Component {
  constructor(props) {
    super(props);
    this.state = { savebody: '' }
  }

  savebody = (data) => {
    this.setState({ savebody: data });
  }

  render() {
    return (
      <div>
        <div className='header'>
          <div className='header_menu'>
            <div className='logo_box'>
              <Tooltip title="ホーム" arrow>
                <IconButton aria-label="Home" >
                  <Link to={`/read`}><img src={logo} className="app_logo" alt="app_logo" /></Link>
                </IconButton>
              </Tooltip>
              <img src={title} className="app_title2" alt="title" />
            </div>
            <Template {...this.props} {...this.state} />
            <LogoutApp />
          </div>
        </div>
        <div className="main">
          <div className='dock_title'><p>利用可能なボックス</p></div>
          <div className="dock"></div>
          <div>
            <Rete2 {...this.props} savebody={this.savebody} />
          </div>
        </div>
      </div>
    );
  }
}


//createPage
class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = { savebody: '' }
  }

  savebody = (data) => {
    this.setState({ savebody: data });
  }

  render() {
    return (
      <div>
        <div className='header'>
          <div className='header_menu'>
            <div className='logo_box'>
              <Tooltip title="ホーム" arrow>
                <IconButton aria-label="Home" >
                  <Link to={`/read`}><img src={logo} className="app_logo" alt="app_logo" /></Link>
                </IconButton>
              </Tooltip>
              <img src={title} className="app_title2" alt="title" />
            </div>
            <Create {...this.state} />
            <LogoutApp />
          </div>
        </div>
        <div className="main">
          <div className='dock_title'><p>利用可能なボックス</p></div>
          <div className="dock"></div>
          <div>
            <Rete2 savebody={this.savebody} />
          </div>
        </div>
      </div>
    );
  }
}


//detailPage
class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = { savebody: '' }
  }

  savebody = (data) => {
    this.setState({ savebody: data });
  }

  render() {
    return (
      <div>
        <div className='header'>
          <div className='header_menu'>
            <div className='logo_box'>
              <Tooltip title="ホーム" arrow>
                <IconButton aria-label="Home" >
                  <Link to={`/read`}><img src={logo} className="app_logo" alt="app_logo" /></Link>
                </IconButton>
              </Tooltip>
              <img src={title} className="app_title2" alt="title" />
            </div>
            <Detail {...this.props} {...this.state} />
            <LogoutApp />
          </div>
        </div>
        <div className="main">
          <div className='dock_title'><p>利用可能なボックス</p></div>
          <div className="dock"></div>
          <div>
            <Rete2 {...this.props} savebody={this.savebody} />
          </div>
        </div>
      </div>
    );
  }
}


//ルーティング処理
const App = () => {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
            <Route exact path="/signup" component={SignupApp} />
            <Route exact path="/login" component={LoginApp} />
            <Route exact path="/" render={props => <Redirect to="/read" />} />
            <PrivateRoute exact path="/template/:id" component={TemplatePage} />
            <PrivateRoute exact path="/create/new" component={CreatePage} />
            <PrivateRoute exact path="/detail/:id" component={DetailPage} />
            <PrivateRoute exact path="/read" component={ReadPage} />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

//ログインしてない時のリダイレクト"/"以外のページ
const PrivateRoute = ({ component: Component, ...rest }) => {
  //認証状態の確認
  let isAuthenticated = '';

  const getc = getcookie();
  if (getc["Token"] !== undefined) {
    isAuthenticated = true
  } else {
    isAuthenticated = false
  };
  return (
    <Route {...rest} render={props => (isAuthenticated
      ? <Component {...props} />
      : <Redirect to="/login" />
    )} />
  )
}

export default App;