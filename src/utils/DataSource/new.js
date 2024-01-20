import EventEmitter from 'eventemitter3';
import { solveCondition, getType } from './utils'

/**
 * 数据源
 */

export default class DataSource extends EventEmitter {
  constructor(options = {}) {
    super();

    this.loading = false;

    this.isRemote = false;

    this.total = 0;
    this.data = [];

    this.page = 1;
    this.size = Infinity;

    this.filterText = '';
    this.filter = null;
    this.sort = null;

    this.treeDisplay = false;

    Object.keys(options).forEach((key) => {
      const option = options[key];
      if (typeof option === 'function') {
        this['_' + key] = option;
      } else if (option !== undefined) {
        this[key] = option;
      }
    });

    this.init();
  }

  get list() {
    if (this.isRemote) {
      return this.data;
    }

    let list = Array.from(this.data);

    const { filter, sort } = this;
    // 前端筛选
    if (filter && Object.keys(filter).length) {
      list = list.filter((item) => solveCondition(filter, item));
    }
    // 前端排序
    if (sort?.field) {
      const { field } = sort;
      const orderSign = sort.order === 'asc' ? 1 : -1;
      if (sort.compare) {
        list.sort((item1, item2) =>
          sort.compare(item1[field], item2[field], orderSign)
        );
      } else {
        list.sort((item1, item2) =>
          this.defaultCompare(item1[field], item2[field], orderSign)
        );
      }
    }

    // 树形展示处理
    if (this.treeDisplay) {
      list = this.listToTree(list, {
        valueField: this.treeDisplay.valueField,
        parentField: this.treeDisplay.parentField,
        childrenField: this.treeDisplay.childrenField,
      });
    }

    this.total = list.length;

    // 根据page， size分页
    const start = (this.page - 1) * this.size;
    const end = start + this.size;
    if (!isNaN(start) && !isNaN(end)) {
      list = list.slice(start, end);
    }

    return list;
  }

  get hasMore() {
    return this.total > this.page * this.size;
  }

  // 初始化
  init() {
    // 初始化时如果有load函数，则认为是远程数据源
    this.isRemote = !!this._load;

    if (!this.isRemote) {
      this.total = this.data.length;
    }
  }

  load(page = this.page, size = this.size) {
    if (this.loading) {
      return Promise.reject();
    }
    this.loading = true;
    this.emit('loadingUpdate', true);
    this.emit('errorUpdate', false);

    const fn = this._load;

    if (!fn) {
      return Promise.resolve().then(() => {
        this.loading = false;
        this.emit('loadingUpdate', false);
        return this.list;
      });
    }

    const params = {
      page,
      size,
      sort: this.sort?.sort,
      order: this.sort?.order,
      filterText: this.filterText,
    };

    return fn(params)
      .then((res) => {
        const result = {};

        // 判断是否后端数据
        if (getType(res) === 'Object') {
          result.data = res.list || res.content;
          result.total = res.total || res.totalElements;
          // 非后端数据
          if (!res.total && !res.totalElements) {
            this.isRemote = false;
          }
        } else if (getType(res) === 'Array') {
          result.data = res;
          result.total = res.length;
          this.isRemote = false;
        } else {
          this.isRemote = false;
        }

        this.data = result.data;
        this.total = result.total;

        return this.list;
      })
      .catch(() => {
        this.emit('errorUpdate', true);
      })
      .finally(() => {
        this.loading = false;
        this.emit('loadingUpdate', false);
      });
  }

  loadMore() {
    if (this.loading || !this.hasMore) {
      return Promise.resolve();
    }

    const page = this.page + 1;
    return this.load(page).then((list) => {
      this.page = page;
      this.emit('pageUpdate', page)
      return list;
    });
  }

  reload() {
    return this.load(1).then(list => {
      this.page = 1;
      this.emit('pageUpdate', 1)
      return list;
    });
  }

  setFilter(filter, text = '') {
    this.filter = filter;
    this.filterText = text;
    return this.reload();
  }

  setPage(page = this.page, size = this.size) {
    this.page = page;
    this.size = size;
    this.emit('pageUpdate', page);
    return this.load();
  }

  setSort(field, order, compare) {
    this.sort = {
      field,
      order,
      compare,
    };
    return this.reload();
  }
}
