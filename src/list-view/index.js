import _get from 'lodash/get';

import { createNamespace } from '../utils';
import DataSourceMixin from '../mixins/DataSource';
import { ParentMixin } from '../mixins/relation';

import EmptyCol from '../emptycol';
import PullRefresh from '../pull-refresh';
import List from '../list';
import ListViewItem from './item';

const [createComponent, bem] = createNamespace('list-view');

export default createComponent({
  mixins: [
    ParentMixin('vanListView'),
    DataSourceMixin
  ],
  props: {
    value: [Array, String, Number],
    pageable: { type: [Boolean, String], default: false },
    filterable: { type: Boolean, default: false },
    placeholder: { type: String, default: '请输入' },
    clearable: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },

    pullRefresh: { type: Boolean, default: false },
    pullingText: { type: String, default: '下拉刷新' },
    loosingText: { type: String, default: '释放刷新' },
    successText: { type: String, default: '刷新成功' },
    successDuration: { type: Number, default: 500 },
    pullDistance: { type: Number, default: 50 },

    designerMode: { type: String, default: 'success' },
    loading: { type: Boolean },
    loadingText: { type: String, default: '正在加载中...' },
    error: { type: Boolean },
    errorText: { type: String, default: '加载失败，请重试' },
    emptyText: { type: String, default: '暂无数据' },

    striped: { type: Boolean, default: false },

    hiddenempty: { type: Boolean, default: false },

    selectedIcon: { type: String },
    unselectedIcon: { type: String },
  },
  data: {
    refreshing: false,
  },
  methods: {
    onLoad() {
      this.load(true);
    },

    renderScrollList() {
      console.log(this.currentData);
      return (
        <List
          value={this.currentLoading}
          error={this.currentError}
          finished={false}
          onLoad={this.onLoad}
        >
          {this.currentData.map((item, index) => {
            if (!item) return null;

            return (
              <ListViewItem
                key={_get(item, this.valueField)}
                value={_get(item, this.valueField)}
                disabled={item.disabled}
                item={item}
                index={index}
                selected={
                  this.multiple
                    ? this.value?.includes(_get(item, this.valueField))
                    : this.value === _get(item, this.valueField)
                }
              >
                {this.slots('item', {
                  item,
                  index,
                }) || _get(item, this.textField)}
              </ListViewItem>
            );
          })}
        </List>
      );
    },
  },
  render() {
    return (
      <div class={bem()}>
        {this.slots()}

        <PullRefresh
          value={this.inDesigner() ? false : this.refreshing}
          disabled={!this.pullRefresh || this.pageable === 'pagination'}
          pullingText={this.pullingText}
          loosingText={this.loosingText}
          loadingText={this.loadingText}
          successText={this.successText}
          successDuration={this.successDuration}
          pullDistance={this.pullDistance}
        >
          {this.renderScrollList()}
        </PullRefresh>
      </div>
    );
  },
});
