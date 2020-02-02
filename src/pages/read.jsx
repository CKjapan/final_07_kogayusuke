import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

import DeleteButton from '../components/delete_button';
import { getcookie } from '../components/get_cookie_function';


//一覧表示処理
class Read extends Component {
  constructor(props) {
    super(props);
    //datalistは登録したものを配列で保持。name等はinputbox用に用意
    this.state = {
      datalist: [],
      title: '',
      body: ''
    };
  };

  //コンポーネント作成時の処理//データベースから情報取得しsetState
  componentDidMount = () => {
    this.getdb();
  };

  //DB取得関数
  getdb = () => {
    const cookie = getcookie();
    axios
      ({
        method: 'GET',
        url: `/api/v1/?author=${cookie["UserId"]}`,
        data: '',
        headers: { Authorization: `Token ${cookie["Token"]}` }
      })
      .then(res => {
        this.setState({ datalist: res.data });
      }).catch(err => {
        console.log('err:', err);
      });
  };

  render() {
    const list = this.state.datalist.map((datalist) => {
      const month = Number(datalist.updated_at.slice(5, 7));
      const day = Number(datalist.updated_at.slice(8, 10));
      const time = datalist.updated_at.slice(11, 16);
      const update = `${month}月${day}日  ${time}`;

      return (
        <div className='detail_list_item' key={datalist.id}>
          <Link to={`/detail/${datalist.id}`}><p className='detail_list_item_title'>{datalist.title}</p></Link>
          <Tooltip title="最終更新日" arrow><p className='detail_list_item_update'>{update}</p></Tooltip>
          <DeleteButton id={datalist.id} getdb={this.getdb} />
        </div>
      );
    });

    return (
      <div className='read_box'>
        <div className='create_list_box'>
          <Link to={`/create/new`}><Button variant="contained" color="primary">新規作成</Button></Link>
          <p>テンプレートから作成</p>
          <Link to={`/template/1`}><Button className='template_button' variant="contained">テンプレート1</Button></Link>
          <Link to={`/template/2`}><Button className='template_button' variant="contained">テンプレート2</Button></Link>
          <Link to={`/template/3`}><Button className='template_button' variant="contained">テンプレート3</Button></Link>
        </div>


        <div className='detail_list_box'>
          <p className='detail_list_box_title'>保存したプロジェクト</p>
          <div className='detail_list'>{list}</div>
        </div>
      </div>
    );
  }
}

export default Read;