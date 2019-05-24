import React, { Component } from 'react';
import classNames from 'class-names';
import './Input.scss';

export default class Input extends Component {
  state = { value: this.props.value || '' };
  componentWillReceiveProps(props) {
    if (props.value !== this.state.value) {
      this.setState({ value: props.value });
    }
  }
  handleChange = e => {
    this.setState({ value: e.target.value });
  };
  handleKeyDown = e => {
    const { onKeyDown, onPressEnter, onChange } = this.props;
    if (e.keyCode === 13) {
      if (onPressEnter) {
        onPressEnter(e);
        return;
      }
      const { value } = this.state;
      value !== this.props.value && onChange(value);
      return;
    }
    onKeyDown && onKeyDown(e);
  };
  handleBlur = e => {
    const { onBlur, onChange } = this.props;
    if (onBlur) {
      onBlur(e);
      return;
    }
    const { value } = this.state;
    value !== this.props.value && onChange(value);
  }
  render() {
    const { value } = this.state;
    const { onPressEnter, className, ...other } = this.props;
    return (
      <input
        {...other}
        className={classNames('my-input', className)}
        onChange={this.handleChange}
        onKeyDown={this.handleKeyDown}
        onBlur={this.handleBlur}
        value={value}
      />
    );
  }
}
