/* eslint react/no-multi-comp: 0, no-alert: 0 */

import React from 'react';
import {Button} from 'react-bootstrap';
import Icon from 'react-fa';

import '../../css/components/list.scss';

export default class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {id: 'fuga', name: 'ふが'},
        {id: 'hoge', name: 'ホゲ'},
        {id: 'hige', name: 'ひげ'}
      ]
    };
  }

  removeItem(id) {
    if (!confirm('本当に削除しますか？')) {
      return;
    }
    this.setState({items: this.state.items.filter(v => v.id !== id)});
  }

  render() {
    const items = [];
    for (const item of this.state.items) {
      items.push((<ListItem key={item.id} id={item.id}
        onRemoveClicked={id => this.removeItem(id)} content={item.name}
      />));
    }
    return (<table className="list table">
      <thead>
      <tr><th>Name</th><th>Remove</th></tr>
      </thead>
      <tbody>
      {items}
      </tbody>
    </table>);
  }
}

class ListItem extends React.Component {
  static get propTypes() {
    return {
      onRemoveClicked: React.PropTypes.func.isRequired,
      content: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired
    };
  }

  onRemoveClicked() {
    this.props.onRemoveClicked(this.props.id);
  }

  render() {
    const removeButton = (
      <Button
        bsSize="xsmall" bsStyle="danger"
        onClick={e => this.onRemoveClicked(e)}
      ><Icon name="remove" />
    </Button>);

    return <tr><td>{this.props.content}</td><td>{removeButton}</td></tr>;
  }
}
