import React, { Component } from 'react';
import axios from 'axios';

import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

import { getcookie } from './get_cookie_function';
import garbage from '../img/garbage.svg'

//delete処理
class DeleteButton extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    //認証トークン取得
    const token = getcookie();
    axios({
      method: 'DELETE',
      url: `/api/v1/${this.props.id}/`,
      data: '',
      headers: { Authorization: `Token ${token["Token"]}` }
    })
      .then(res => {
        //リスト更新
        this.props.getdb();
      })
  };

  render() {
    return (
      <div className='detail_list_item_delete'>
        <Tooltip title="削除" arrow>
          <IconButton aria-label="Delete" onClick={this.handleSubmit}>
            <img src={garbage} className="garbage_img" alt="delete" />
          </IconButton>
        </Tooltip>
      </div>
    );
  }
}

export default DeleteButton;