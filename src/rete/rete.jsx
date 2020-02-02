import React, { Component } from 'react';
import axios from 'axios';

import Rete from "rete";
import ReactRenderPlugin from "rete-react-render-plugin";
import ConnectionPlugin from "rete-connection-plugin";
import AreaPlugin from "rete-area-plugin";
import { MyNode } from "./MyNode";
import DockPlugin from 'rete-dock-plugin';
import CommentPlugin from 'rete-comment-plugin';
import KeyboardPlugin from 'rete-keyboard-plugin';
import HistoryPlugin from 'rete-history-plugin';
import MinimapPlugin from 'rete-minimap-plugin';

import NumControl from './NumControl';
import { getcookie } from '../components/get_cookie_function';


var numSocket = new Rete.Socket("Number value");

//　　出力BOX(左)作成
class NumComponent extends Rete.Component {
  constructor() {
    //タイトル
    super("数字");
  }

  //タイトル以外を表示
  builder(node) {
    //output1ソケットを作成
    var out1 = new Rete.Output("num", "出力", numSocket);
    //インプット欄を作成
    var ctrl = new NumControl(this.editor, "num", node);

    //タイトル意外を表示
    return node
      //インプット欄を表示
      .addControl(ctrl)
      //output1ソケットを表示
      .addOutput(out1);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
  }
}

//　　合計BOX(右)作成
class AddComponent extends Rete.Component {
  constructor() {
    //タイトル
    super("合計");
    this.data.component = MyNode; // optional
  }

  builder(node) {
    //input1ソケットを作成
    var inp1 = new Rete.Input("num1", "入力1", numSocket);
    //input2ソケット
    var inp2 = new Rete.Input("num2", "入力2", numSocket);
    //output1ソケット
    var out = new Rete.Output("num", "出力", numSocket);

    inp1.addControl(new NumControl(this.editor, "num1", node));
    inp2.addControl(new NumControl(this.editor, "num2", node));

    return node
      //入力１ソケット
      .addInput(inp1)
      //入力２ソケット
      .addInput(inp2)
      //合計欄
      .addControl(new NumControl(this.editor, "preview", node, true))
      //出力ソケット
      .addOutput(out);
  }

  worker(node, inputs, outputs) {
    var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
    var sum = Number(n1) + Number(n2);

    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("preview")
      .setValue(sum);
    outputs["num"] = sum;
  }
}

//　　掛け算BOX(右)作成
class MultiComponent extends Rete.Component {
  constructor() {
    //タイトル
    super("掛け算");
    this.data.component = MyNode; // optional
  }

  builder(node) {
    //input1ソケットを作成
    var inp1 = new Rete.Input("num1", "入力1", numSocket);
    //input2ソケット
    var inp2 = new Rete.Input("num2", "入力2", numSocket);
    //output1ソケット
    var out = new Rete.Output("num", "出力", numSocket);

    inp1.addControl(new NumControl(this.editor, "num1", node));
    inp2.addControl(new NumControl(this.editor, "num2", node));

    return node
      //入力１ソケット
      .addInput(inp1)
      //入力２ソケット
      .addInput(inp2)
      //合計欄
      .addControl(new NumControl(this.editor, "preview", node, true))
      //出力ソケット
      .addOutput(out);
  }

  //計算式の設定
  worker(node, inputs, outputs) {
    var n1 = inputs["num1"].length ? inputs["num1"][0] : node.data.num1;
    var n2 = inputs["num2"].length ? inputs["num2"][0] : node.data.num2;
    var sum = Number(n1) * Number(n2);

    this.editor.nodes
      .find(n => n.id === node.id)
      .controls.get("preview")
      .setValue(sum);
    outputs["num"] = sum;
  }
}

//　　各BOX設定
export class Rete2 extends Component {
  constructor(props) {
    super();
  }

  componentDidMount = () => {
    var container = document.querySelector('.rete');
    var components = [new NumComponent(), new AddComponent(), new MultiComponent()];

    //　プラグインの設定
    var editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(ReactRenderPlugin);
    editor.use(KeyboardPlugin);
    editor.use(DockPlugin, {
      container: document.querySelector('.dock'),
      itemClass: 'dock-item', // default: dock-item
      plugins: [ReactRenderPlugin] // render plugins
    });
    editor.use(CommentPlugin, {
      margin: 30// indent for new frame comments by default 30 (px)
    });
    editor.use(AreaPlugin, {
      background: true,
      snap: false,
      scaleExtent: { min: 0.5, max: 0.8 },
      translateExtent: { width: 5000, height: 4000 }
    });
    editor.use(HistoryPlugin, { keyboard: true });
    editor.use(MinimapPlugin);

    var engine = new Rete.Engine("demo@0.1.0");

    components.map(c => {
      editor.register(c);
      engine.register(c);
      return (c);
    });

    //キーダウン
    editor.on('keydown', e => {
      switch (e.code) {
        case "Backspace":
          if (editor.selected.list !== '') {
            editor.selected.each(n => editor.removeNode(n));
            editor.selected.list = []
          }
          break;
        case "Delete":
          if (editor.selected.list !== '') {
            editor.selected.each(n => editor.removeNode(n));
            editor.selected.list = []
          }
          break;
        // default: break;
      }
    });

    //Jsonへの出力。これがないと適時自動計算してくれない。。。
    editor.on(//
      "process nodecreated noderemoved connectioncreated connectionremoved nodedraged",
      async () => {
        await engine.process(editor.toJSON());
        const data = editor.toJSON();
        this.setState({ body: data });
        this.props.savebody(data);
      }
    );

    editor.view.resize();
    editor.trigger("process");
    AreaPlugin.zoomAt(editor);
    editor.trigger('undo');
    editor.trigger('redo');

    //データ読み込み
    if (this.props.match !== undefined) {
      if (this.props.match.url === "/template/1") {
        editor.fromJSON({ "id": "demo@0.1.0", "nodes": { "4": { "id": 4, "data": { "num": "5" }, "inputs": {}, "outputs": { "num": { "connections": [{ "node": 6, "input": "num1", "data": {} }] } }, "position": [-451.42578291801783, -445.4150468312514], "name": "数字" }, "6": { "id": 6, "data": { "num1": 0, "num2": 0, "preview": 10 }, "inputs": { "num1": { "connections": [{ "node": 4, "output": "num", "data": {} }] }, "num2": { "connections": [{ "node": 7, "output": "num", "data": {} }] } }, "outputs": { "num": { "connections": [] } }, "position": [-102.33397686891962, -452.9345776935171], "name": "合計" }, "7": { "id": 7, "data": { "num": "5" }, "inputs": {}, "outputs": { "num": { "connections": [{ "node": 6, "input": "num2", "data": {} }] } }, "position": [-453.4960997150265, -274.3896570022472], "name": "数字" } }, "comments": [] });
      } else if (this.props.match.url === "/template/2") {
        editor.fromJSON({ "id": "demo@0.1.0", "nodes": {}, "comments": [] });
      } else if (this.props.match.url === "/template/3") {
        editor.fromJSON({ "id": "demo@0.1.0", "nodes": {}, "comments": [] });
      } else {
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
            editor.fromJSON(JSON.parse(res.data.body));
          });
      }
    }
  }

  render() {
    return (
      <div className='rete'></div >
    )
  }
}
