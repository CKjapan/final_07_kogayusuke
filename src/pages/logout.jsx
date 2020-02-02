import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import { getcookie } from '../components/get_cookie_function';


//logout処理
class LogoutApp extends Component {
  state = {
    logout: false,
    anchorEl: null
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const cookie = getcookie();
    axios({
      method: 'POST',
      url: `/api/v1/rest-auth/logout/?author=${cookie["UserId"]}`,
      data: '',
      headers: { Authorization: `Token ${cookie["Token"]}` }
    })
      .then(res => {
        document.cookie = 'Token=' + encodeURIComponent(res.data.key) + ';path = /;max-age=0';
        document.cookie = `UserId=` + encodeURIComponent(res.data.pk) + ';path = /;max-age=0';
        document.cookie = `UserName=` + encodeURIComponent(res.data.username) + ';path = /;max-age=0';
        //ログアウト状態をtrueに
        this.setState({ logout: true });
      })
  };

  //popupmenu
  handleMenu = e => {
    e.preventDefault();
    this.setState({ anchorEl: e.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  //ログアウトボタンJSX表示
  render() {
    // もしログアウト状態ならログインページへ飛ばす
    if (this.state.logout === true) {
      return <Redirect to="/login" />;
    }
    return (
      <div className='logout_box'>

        <div>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={this.handleMenu}
            color="inherit"
          >
            <AccountCircle style={{ fontSize: 36 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={this.state.anchorEl}
            keepMounted
            open={Boolean(this.state.anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem type="submit" onClick={this.handleSubmit}>Logout</MenuItem>
            <MenuItem onClick={this.handleClose}>My account</MenuItem>
          </Menu>
        </div>

      </div>
    )
  }
}

export default LogoutApp;