import React, { Component } from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import { getcookie } from '../components/get_cookie_function';
import { SaveButton } from '../components/save_button';


//create処理
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
    };
  };

  //idに対応するデータの取得とインプットボックスへの表示
  componentDidMount = () => {
    const textid = this.props.match.params.id;
    const cookie = getcookie();
    axios
      ({
        method: 'GET',
        url: `/api/v1/${textid}/`,
        data: '',
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({
          title: res.data.title,
        });
      })
  }

  //入力内容をinputboxに反映させる関数
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  //submitでstate更新＆データベース保存
  handleSubmit = (e) => {
    e.preventDefault();
    const textid = this.props.match.params.id;
    const cookie = getcookie();
    //データベース保存用定数
    const data = { id: textid, author: cookie["UserId"], title: this.state.title, body: JSON.stringify(this.props.savebody) };
    //データベース保存
    axios
      ({
        method: 'PUT',
        url: `/api/v1/${data.id}/?author=${cookie["UserId"]}`,
        data: data,
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({
          title: res.data.title,
        });
      })
  };

  render() {
    return (
      <div className='save_box'>
        <form onSubmit={this.handleSubmit}>
          <div className='input_title'><TextField required name="title" type="text" value={this.state.title} onChange={this.handleChange} id="outlined-basic" variant="outlined" /></div>
          <div className='save_button'><SaveButton /></div>
        </form>
      </div>
    );
  }
}

export default Detail;