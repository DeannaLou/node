import { observable, computed, action } from 'mobx';
import myFetch from '../util/myFetch';

const ADDINGTODO = 'adding';

class Todos {
  @observable todos = [];

  @computed get unfinishedTodoCount() {
    return this.unfinishedTodos.length;
  }
  @computed get unfinishedTodos() {
    const todos = (this.todos || []).slice();
    return todos.filter(todo => todo === ADDINGTODO || !todo.finished);
  }
  @computed get finishedTodoCount() {
    return this.finishedTodos.length;
  }
  @computed get finishedTodos() {
    const todos = (this.todos || []).slice();
    return todos.filter(todo => todo.finished);
  }

  @action.bound
  async updateTodos() {
    const todos = await myFetch('/api/todos');
    this.todos = todos;
  }
  @action.bound
  async createTodo(title) {
    if (!title) return;
    const res = await myFetch('/api/todos/create', { title });
    await this.updateTodos();
    return res && res.id;
  }
  @action.bound
  async finishTodo(id, finished) {
    await myFetch('/api/todos/finish', { id, finished: !finished });
    await this.updateTodos();
  }
  @action.bound
  async deleteTodo(id) {
    await myFetch('/api/todos/delete', { id });
    await this.updateTodos();
  }
  @action.bound
  async updateTodo(todo) {
    await myFetch('/api/todos/update', todo);
    await this.updateTodos();
  }
  @action.bound
  addingTodoBehind(id) {
    this.clearAdding();
    const index = id === undefined ? this.todos.length : this.todos.findIndex(v => v.id === id) + 1;
    this.todos.splice(index, 0, ADDINGTODO);
  }
  @action.bound
  clearAdding() {
    if (!this.todos.some(v => v === ADDINGTODO)) return;
    this.todos = this.todos.filter(v => v !== ADDINGTODO);
  }
}

export default new Todos();
