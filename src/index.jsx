import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Todos from './pages/todos';
import Bills from './pages/bills';
import todoStore from './store/todos';
import billStore from './store/bills';
import './index.scss';

class App extends Component {
  render() {
    return (
      <Provider todoStore={todoStore} billStore={billStore}>
        <Switch>
          <Route exact path='/' component={Todos} />
          <Route path='/bill' component={Bills} />
        </Switch>
      </Provider>
    );
  }
}

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.querySelector('#app'),
);
