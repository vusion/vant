// 这个mixin主要给带分页筛选的数据源组件使用

import DataSource from '../utils/DataSource/new';

export default {
  props: {
    // 数据源
    dataSource: [DataSource, Function, Object, Array],
    // 初始加载
    initialLoad: { type: Boolean, default: true },
    // 值字段
    valueField: { type: String, default: 'value' },
    // 文本字段
    textField: { type: String, default: 'text' },
    // 描述字段
    descriptionField: { type: String, default: 'description' },

    // 分页相关
    // pageable: { type: [Boolean, String], default: false }, // 由组件自己定义
    pageNumber: { type: Number, default: 1 },
    pageSize: { type: Number, default: 50 },

    // 筛选相关
    // filterable: { type: Boolean, default: false }, // 由组件自己定义
    matchMethod: { type: [String, Function], default: 'includes' },
    caseSensitive: { type: Boolean, default: false },

    // 排序相关
    // sorting: Object, // 由组件自己定义

    // 树形组件相关
    // treeDisplay: { type: Boolean, default: false }, // 由组件自己定义
    parentField: { type: String, default: 'parentId' },
    childrenField: { type: String, default: 'children' },

    // 其他
    // needAllRemoteData: { type: Boolean, default: false }, // 由组件自己定义
  },
  data() {
    return {
      data: [],

      currentLoading: false,
      currentError: false,

      currentDataSource: undefined,
      currentPageNumer: this.pageNumber,
      currentPageSize: this.pageSize,
      filterText: '', // 过滤文本，只有 input 时会改变它
      currentSorting: this.sorting, // 内部操作后的排序
    };
  },
  watch: {
    dataSource(dataSource, old) {
      if (
        typeof dataSource === 'function' &&
        String(dataSource) === String(old)
      )
        return;

      this.handleData();
    },

    pageNumber(val) {
      this.currentPageNumer = val;
    },
    pageSize(val) {
      this.currentPageSize = val;
    },

    sorting: {
      deep: true,
      handler(sorting, oldSorting) {
        if (
          sorting.field === oldSorting.field &&
          sorting.order === oldSorting.order
        )
          return;

        this.currentSorting = sorting;

      },
    },

    currentSorting: {
      deep: true,
      handler(sorting) {
        this.setSort(sorting.field, sorting.order, sorting.compare);
      }
    },

    filtering: {
      deep: true,
      handler(filtering) {
        this.setFilter(filtering);
      },
    },

    paging: {
      deep: true,
      handler(paging) {
        this.setPage(paging.page, paging.size);
      }
    },
  },
  computed: {
    inDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },

    currentData() {
      return this.currentDataSource?.list || [];
    },

    allData() {
      return this.currentDataSource?.allData || [];
    },

    paging() {
      if (this.pageable) {
        return {
          page: this.currentPageNumer,
          size: this.currentPageSize,
        };
      }

      return undefined;
    },

    filtering() {
      return {
        [this.textField]: {
          operator: this.matchMethod,
          value: this.filterText,
          caseInsensitive: !this.caseSensitive,
        },
      };
    },

    hasMore() {
      return this.currentDataSource?.hasMore;
    },
  },

  created() {
    this.initData();

    if (this.currentDataSource) {
      this.currentDataSource.on('pageUpdate', this.onPageChange);
      this.currentDataSource.on('loadingUpdate', this.onLoadingChange);
      this.currentDataSource.on('errorUpdate', this.onErrorChange);
    }
  },
  beforeDestroy() {
    if (this.currentDataSource) {
      this.currentDataSource.off('pageUpdate', this.onPageChange);
      this.currentDataSource.off('loadingUpdate', this.onLoadingChange);
      this.currentDataSource.off('errorUpdate', this.onErrorChange);
    }
  },
  methods: {
    initData() {
      if (this.inDesigner) return;
      this.currentDataSource = normalizeDataSource(
        this.dataSource,
        this.getDataSourceOptions()
      );
      // 初始加载开启时
      if (this.currentDataSource && this.initialLoad) {
        this.load();
      }
    },
    getDataSourceOptions() {
      const options = {
        viewMode: this.viewMode || 'more', // 'more' | 'page'
        needAllData: this.needAllRemoteData,

        sort: this.currentSorting,
        filter: this.filtering,
        ...(this.paging || {}),
        filterText: this.filterText,
      };

      if (
        this.treeDisplay &&
        this.valueField &&
        this.parentField &&
        this.childrenField
      ) {
        options.treeDisplay = {
          valueField: this.valueField,
          parentField: this.parentField,
          childrenField: this.childrenField,
        };

        // 启用树形时不分页
        options.page = undefined;
        options.size = undefined;
      }

      return options;
    },

    load() {
      if (!this.currentDataSource) return Promise.reject();

      return this.currentDataSource.load().then(list => {
        this.data = list;
        this.$emit('load', undefined, this);
      })
    },

    loadMore() {
      if (!this.currentDataSource) return Promise.reject();

      return this.currentDataSource.loadMore().then(list => {
        this.data = [...this.data, ...list];
      })
    },

    // 对外暴露的API
    reload() {
      if (!this.currentDataSource) return Promise.reject();

      return this.currentDataSource.reload().then(list => {
        this.data = list;
      })
    },
    setPage(page, size) {
      this.currentDataSource.setPage(page, size).then(list => {
        this.data = list;
      });
    },
    setSort(field, order, compare) {
      const sorting = { field, order, compare };
      this.currentDataSource.setSort(sorting).then((list) => {
        this.data = list;
      });
    },
    setFilter(filtering) {
      this.currentDataSource
        .setFilter(filtering, this.filterText)
        .then((list) => {
          this.data = list;
        });
    },

    onPageChange(page) {
      this.currentPageNumer = page;

      this.$emit('page', {
        number: page,
        size: this.currentPageSize,
      }, this);
      this.$emit('update:page-number', page, this);
    },

    onLoadingChange(loading) {
      this.currentLoading = loading;
    },

    onErrorChange(error) {
      this.currentError = error;
    }
  },
};

function normalizeDataSource(dataSource, options = {}) {
  if (dataSource instanceof DataSource) return dataSource;
  // 数组
  if (dataSource instanceof Array) {
    options.data = Array.from(dataSource);

    return new DataSource(options);
  }

  if (dataSource instanceof Function) {
    // 构造load函数
    options.load = function load(params) {
      const result = dataSource(params);
      if (result instanceof Promise) return result;

      return Promise.resolve(result);
    };

    return new DataSource(options);
  }

  if (dataSource instanceof Object) {
    if (dataSource.list && Array.isArray(dataSource.list))
      return new DataSource(
        Object.assign(options, dataSource, {
          data: dataSource.list,
        })
      );
    return new DataSource(Object.assign(options, dataSource));
  }

  return undefined;
}
