import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import strftime from 'strftime';
import classNames from 'class-names';
import { EditableInput, Input } from '../../components/input';
import './index.scss';

@inject(({ todoStore }) => ({ store: todoStore }))
@observer
export default class Todos extends Component {
  state = {
    value: '',
    hideUnfinished: false,
    hideFinished: false,
  };
  componentWillMount() {
    this.props.store.updateTodos();
  }
  render() {
    const { finishedTodoCount, createTodo } = this.props.store;
    const { value } = this.state;
    return (
      <div className='todos'>
        <Input
          value={value}
          placeholder="添加今天的任务"
          onChange={async value => {
            await createTodo(value);
            this.setState({ value: '' });
          }}
          onBlur={() => {}}
          autoFocus
        />
        {this.renderUnFinished()}
        {finishedTodoCount > 0 && this.renderFinished()}
      </div>
    );
  }

  renderUnFinished() {
    const { unfinishedTodoCount, unfinishedTodos } = this.props.store;
    const { hideUnfinished } = this.state;
    return (
      <div className='todos-unfinished'>
        <p
          className='todos-title'
          onClick={() => this.setState({ hideUnfinished: !hideUnfinished })}
        >
          <span
            className={classNames({
              'title-hide': hideUnfinished,
            })}
          />
          未完成： {unfinishedTodoCount}
        </p>
        <ul
          className={classNames('todos-list', {
            'todos-list-hide': hideUnfinished,
          })}
        >
          {unfinishedTodos.map(todo => this.renderTodo(todo))}
        </ul>
      </div>
    );
  }
  renderFinished() {
    const { finishedTodoCount, finishedTodos } = this.props.store;
    const { hideFinished } = this.state;
    return (
      <div className='todos-finished'>
        <p
          className='todos-title'
          onClick={() => this.setState({ hideFinished: !hideFinished })}
        >
          <span
            className={classNames('todos-title', {
              'title-hide': hideFinished,
            })}
          />
          已完成： {finishedTodoCount}
        </p>
        <ul
          className={classNames('todos-list', {
            'todos-list-hide': hideFinished,
          })}
        >
          {finishedTodos.map(todo => this.renderTodo(todo))}
        </ul>
      </div>
    );
  }
  renderTodo(todo) {
    const {
      addingTodoBehind,
      clearAdding,
      createTodo,
      finishTodo,
      deleteTodo,
      updateTodo,
    } = this.props.store;
    if (todo === 'adding') {
      return (
        <li key='adding' className='todo'>
          <input type='checkbox' />
          <Input
            className='todo-content'
            onChange={createTodo}
            placeholder="添加今天的任务"
            autoFocus
            onPressEnter={async e => {
              const id = await createTodo(e.target.value);
              addingTodoBehind(id);
            }}
          />
          <span className='todo-date'>{strftime('%Y-%m-%d', new Date())}</span>
        </li>
      );
    }
    return (
      <li key={todo.id} className='todo'>
        <input
          type='checkbox'
          defaultChecked={todo.finished}
          readOnly={todo.finished}
          onClick={() => finishTodo(todo.id, todo.finished)}
        />
        {todo.finished ? (
          <span className='todo-content'>{todo.title}</span>
        ) : (
          <EditableInput
            className='todo-content'
            onPressEnter={async e => {
              if (e.target.value !== todo.title) {
                await updateTodo({ id: todo.id, title: e.target.value });
              }
              addingTodoBehind(todo.id);
            }}
            onBlur={async e => {
              if (e.target.value !== todo.title) {
                await updateTodo({ id: todo.id, title: e.target.value });
              }
              clearAdding();
            }}
            value={todo.title}
          />
        )}
        <span className='todo-date'>
          {strftime('%Y-%m-%d', new Date(todo.createTs))}
        </span>
        {!todo.finished && (
          <button className='todo-delete' onClick={() => deleteTodo(todo.id)}>
            删除
          </button>
        )}
      </li>
    );
  }
}
