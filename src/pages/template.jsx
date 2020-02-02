import React, { Component } from 'react';

import axios from 'axios';

import TextField from '@material-ui/core/TextField';

import { getcookie } from '../components/get_cookie_function';
import { SaveButton } from '../components/save_button';

//create処理
class Template extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textid: "",
      title: 'テンプレート',
      body: '',
      body1: '{"id":"demo@0.1.0","nodes":{"4":{"id":4,"data":{"num":"5"},"inputs":{},"outputs":{"num":{"connections":[{"node":6,"input":"num1","data":{}}]}},"position":[-451.42578291801783,-445.4150468312514],"name":"数字"},"6":{"id":6,"data":{"num1":0,"num2":0,"preview":10},"inputs":{"num1":{"connections":[{"node":4,"output":"num","data":{}}]},"num2":{"connections":[{"node":7,"output":"num","data":{}}]}},"outputs":{"num":{"connections":[]}},"position":[-102.33397686891962,-452.9345776935171],"name":"合計"},"7":{"id":7,"data":{"num":"5"},"inputs":{},"outputs":{"num":{"connections":[{"node":6,"input":"num2","data":{}}]}},"position":[-453.4960997150265,-274.3896570022472],"name":"数字"}},"comments":[]}',
      body2: '{"id": "demo@0.1.0","nodes": {},"comments": []}',
      body3: '{"id": "demo@0.1.0","nodes": {},"comments": []}',
    };
  };

  componentDidMount = () => {
    const cookie = getcookie();
    const textid = this.props.match.params.id;
    let tempbody = '';
    if (textid === '1') {
      tempbody = this.state.body1
    } else if (textid === '2') {
      tempbody = this.state.body2
    } else if (textid === '3') {
      tempbody = this.state.body3
    }
    const data = { author: cookie["UserId"], title: this.state.title, body: tempbody };
    axios
      ({
        method: 'POST',
        url: '/api/v1/',
        data: data,
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        // sessionStorage.setItem('json', tempbody);
        this.setState({
          textid: res.data.id,
        });
      })
  }


  handleChange = (e) => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    // const textid = this.props.match.params.id;
    const cookie = getcookie();
    console.log(this.props)
    // var json = sessionStorage.getItem('json');//後で消す
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

export default Template;