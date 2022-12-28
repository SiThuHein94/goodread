// import { makeAutoObservable} from 'mobx';

class BaseStore {
  constructor(props) {
    // makeAutoObservable(this)
    this.api = props.api;
    this.contents = { isLoading: false, data: [] };
    this.item = { isLoading: false, data: {} };
    this.isUpdating = false;
    
  }

  getAll = (payload) => this.api.getAll(payload);
  get = (id) => this.api.get(id);
  update = (payload) => this.api.update(payload);
}

export default BaseStore;
