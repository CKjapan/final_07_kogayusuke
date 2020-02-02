import React, { Component } from 'react';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import axios from 'axios';
import { Link } from 'react-router-dom';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {/* <Link color="inherit" href=""> */}
      {/* Your Website */}
      KeisanFukurow
     {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      // email: '',
      password: '',
      login: false
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //login処理
  handleSubmit = (e) => {
    e.preventDefault();
    //データベース送信用定数
    const data = { username: this.state.username, email: this.state.email, password: this.state.password };
    //認証処理//認証データの送信とTokenの取得
    axios
      .post('/api/v1/rest-auth/login/', data)
      .then(res => {
        //無事POST出来たらtokenkeyをcookieへ保存
        document.cookie = 'Token=' + encodeURIComponent(res.data.key) + ';path = /;max-age=432000';
        // this.setState({ login: true });
        axios
          //成功したらid取得
          .get('/api/v1/rest-auth/user/', {
            headers: { Authorization: `Token ${res.data.key}` }
          })
          .then(res => {
            //無事GET出来たらusername,idをcookieへ保存
            document.cookie = `UserId=` + encodeURIComponent(res.data.pk) + ';path = /;max-age=432000';
            document.cookie = `UserName=` + encodeURIComponent(res.data.username) + ';path = /;max-age=432000';
            this.props.history.push("/read")
          })
      })
  };

  render() {
    const classes = makeStyles(theme => ({
      paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
      },
      form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
      },
      submit: {
        margin: theme.spacing(3, 0, 2),
      },
    }));

    return (
      <Container component="main" maxWidth="xs" >
        <CssBaseline />
        <div className={classes.paper}>
          <div className='lockoutlogo'>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
          </div>
          <Typography component="h1" variant="h5">
            Sign in
      </Typography>
          <form onSubmit={this.handleSubmit} className={classes.form} noValidate>
            <TextField
              value={this.state.username}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="ユーザーネーム"
              name="username"
              autoFocus
            />
            <TextField
              value={this.state.password}
              onChange={this.handleChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
             control={<Checkbox value="remember" color="primary" />}
             label="Remember me"
           /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
        </Button>
            <Grid container>
              <Grid item xs>
                <Link to={"/#"} variant="body2">
                  ログインできない方はこちら
            </Link>
              </Grid>
              <Grid item>
                <Link to={`/signup`} variant="body2">
                  {'アカウント新規作成'}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    )
  }
}


export default LoginApp;