import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import strftime from 'strftime';
import { EditableInput } from '../../components/input';

@inject(({ todoStore }) => ({ store: todoStore }))
@observer
export default class Todo extends Component {
  render() {
    const { addingTodoBehind, clearAdding } = this.props.store;
    const { finishTodo, deleteTodo, updateTodo } = this.props.store;
    return (
      <li key={todo.id} className='todo'>
        <input
          type='checkbox'
          defaultChecked={todo.finished}
          readOnly={todo.finished}
          onClick={() => finishTodo(todo.id, todo.finished)}
        />
        {todo.finished ? (
          todo.title
        ) : (
            <EditableInput
              onPressEnter={async e => {
                await updateTodo({ ...todo, title: e.target.value });
                addingTodoBehind(todo.id);
              }}
              onBlur={async e => {
                if (e.target.value !== todo.title) {
                  await updateTodo({ ...todo, title: e.target.value });
                }
                clearAdding();
              }}
              onChange={value => updateTodo({ ...todo, title: value })}
              value={todo.title}
            />
          )}
        <span>{strftime('%Y-%m-%d', new Date(todo.createTs))}</span>
        {!todo.finished && (
          <button onClick={() => deleteTodo(todo.id)}>删除</button>
        )}
      </li>
    );
  }
}