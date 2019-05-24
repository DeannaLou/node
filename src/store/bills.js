import { observable, action } from 'mobx';
import myFetch from '../util/myFetch';
import strftime from 'strftime';

class Bills {
  @observable dateMaps = {};

  @action.bound
  async updateBills() {
    const bills = await myFetch('/api/bills');
    this.dateMaps = bills.reduce((dateMaps, bill) => {
      const date = strftime("%Y-%m-%d", new Date(bill.date));
      if (!dateMaps[date]) {
        dateMaps[date] = [];
      }
      dateMaps[date].push(bill);
      return dateMaps;
    }, {});
  }
}

export default new Bills();
