import React, { Component } from 'react';
import classNames from 'class-names';
import Input from './Input.jsx';

export default class Editable extends Component {
  state = {
    editing: false,
    value: this.props.value
  };
  componentWillUpdate(props) {
    if (props.value !== this.props.value) {
      this.setState({ value: props.value });
    }
  }
  handleClick = e => {
    this.setState({ editing: true });
  };
  handleBlur = e => {
    this.setState({ editing: false });
  };
  render() {
    const { editing } = this.state;
    const { className, ...props } = this.props;
    return (
      <div className={classNames("my-input-editable", className)} onClick={this.handleClick}>
        {editing ? <Input
          {...props}
          autoFocus
          onPressEnter={e => {
            this.handleBlur();
            props.onPressEnter && props.onPressEnter(e);
          }}
          onBlur={e => {
            this.handleBlur();
            props.onBlur && props.onBlur(e);
          }} /> : this.state.value}
      </div>
    )
  }
}