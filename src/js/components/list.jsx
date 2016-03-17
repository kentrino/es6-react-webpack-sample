import React from 'react';
import update from 'react-addons-update'
import ReactDOM from 'react-dom';
import {Button} from 'react-bootstrap';
import Icon from 'react-fa';

import '../../css/components/list.scss';

export default class List extends React.Component {
  constructor(props) {
    super(props)
    this.removeItem = this.removeItem.bind(this);
    
    this.state = {
      items: {
        "hoge": {name: "ホゲ", deleted: false},
        "hige": {name: "ひげ", deleted: false}
      }
    };
  }
  
  removeItem (key) {
    if( !confirm("本当に削除しますか？") ){
       return
    }
    var forUpdate = { items: {} }
    forUpdate.items[key] = {deleted: {$set: true}};
    var newState = update(this.state, forUpdate);
    this.setState(newState);
  }

  render() {
    var items = [];
    for( var key in this.state.items ){
      if( !this.state.items[key].deleted ){
        items.push((<ListItem key={key} id={key} onRemoveClicked={this.removeItem} content={this.state.items[key].name}/>));
      }
    }
    return <table className="list table">
      <thead>
      <tr><th>Name</th><th>Remove</th></tr>
      </thead>
      <tbody>
      {items}
      </tbody>
    </table>
  }
}

class ListItem extends React.Component {
  static get propTypes() {
    return {
        onRemoveClicked: React.PropTypes.func.isRequired,
        content: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
    }
  }
  
  constructor() {
    super();
  }
  
  onRemoveClicked(e) {
    this.props.onRemoveClicked(this.props.id);
  }
  
  render() {
    var removeButton = (<Button bsSize="xsmall" bsStyle="danger" onClick={this.onRemoveClicked.bind(this)}>
      <Icon name="remove" />
    </Button>);
    
    return <tr><td>{this.props.content}</td><td>{removeButton}</td></tr>
  }
}
