import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import strftime from 'strftime';
import myFetch from '../../util/myFetch';
import Input from '../../components/input';

@inject(({ billStore }) => ({ store: billStore }))
@observer
export default class Bills extends Component {
  state = {
    title: '',
    count: 0,
    date: strftime('%Y-%m-%d', new Date(Date.now())),
  };
  componentWillMount() {
    this.props.store.updateBills();
  }
  handleCreate = async () => {
    await myFetch('/api/bills/add', {
      title: this.state.title,
      count: this.state.count,
      date: new Date(this.state.date).getTime(),
    });
    this.props.store.updateBills();
    this.setState({
      title: '',
      count: 0,
      date: strftime('%Y-%m-%d', new Date(Date.now())),
    });
  };
  handleDelete = id => async () => {
    await myFetch('/api/bills/delete', { id });
    this.props.store.updateBills();
  };
  handleUpdate = (id, newData) => async () => {
    this.props.actions
    await myFetch('/api/bills/update', { ...newData, id });
    this.props.store.updateBills();
  };

  render() {
    const { dateMaps } = this.props.store;
    return (
      <div>
        <Input
          value={this.state.title}
          onChange={title => this.setState({ title })}
        />
        <Input
          value={this.state.count}
          type='number'
          onChange={count => this.setState({ count })}
        />
        <Input
          value={this.state.date}
          onChange={date => this.setState({ date })}
        />
        <button onClick={this.handleCreate}>添加</button>
        {Object.entries(dateMaps).map(([date, bills], index) =>
          this.renderBill(date, bills, index),
        )}
      </div>
    );
  }

  renderBill(date, bills, index) {
    return (
      <li key={index}>
        {date}
        <ul>
          {bills.map(bill => (
            <li key={bill.id}>
              <span>{bill.title}</span>
              <span>{bill.count}</span>
            </li>
          ))}
        </ul>
      </li>
    );
  }
}
