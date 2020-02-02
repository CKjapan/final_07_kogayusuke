import React, { Component } from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import { getcookie } from '../components/get_cookie_function';
import { SaveButton } from '../components/save_button';


class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textid: "",
      title: '無題のプロジェクト',
      body: '{"id": "demo@0.1.0","nodes": {},"comments": []}',
    };
  };

  componentDidMount = () => {
    const cookie = getcookie();
    const data = { author: cookie["UserId"], title: this.state.title, body: this.state.body };
    axios
      ({
        method: 'POST',
        url: '/api/v1/',
        data: data,
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({
          textid: res.data.id,
        });
      })
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const cookie = getcookie();
    const data = { id: this.state.textid, author: cookie["UserId"], title: this.state.title, body: JSON.stringify(this.props.savebody) };
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

export default Create;