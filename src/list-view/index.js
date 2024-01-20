import _debounce from 'lodash/debounce';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import PullUp from '@better-scroll/pull-up';

import { createNamespace, _get } from '../utils';
import DataSourceMixin from '../mixins/DataSourceNew';
import { ParentMixin } from '../mixins/relation';

import EmptyCol from '../emptycol';
import Search from '../search';
import ListViewItem from '../list-view-item';

BScroll.use(PullDown);
BScroll.use(PullUp);

const [createComponent, bem, t] = createNamespace('list-view');

const THRESHOLD = 70;
const STOP = 56;

export default createComponent({
  mixins: [ParentMixin('vanListView'), DataSourceMixin],
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
  data() {
    return {
      currentValue: this.value,
      pullDownTip: '',
    };
  },
  watch: {
    value(val) {
      this.currentValue = val;
    },
    data() {
      this.$nextTick(() => {
        this.bscroll && this.bscroll.refresh();
      });
    },
  },
  computed: {
    pullUpTipVisible() {
      return ['auto-more', 'load-more'].includes(this.pageable);
    },
    pullUpTip() {
      if (this.fetchLoading) {
        return this.loadingText;
      }

      if (this.fetchError) {
        return this.errorText;
      }

      if (this.hasMore && this.pageable === 'load-more') {
        return <a onClick={this.loadMore}>{t('loadMore')}</a>;
      }

      if (
        !this.hasMore &&
        ['auto-more', 'load-more'].includes(this.pageable) &&
        !this.hiddenempty
      ) {
        return t('noMore');
      }

      if (!this.data?.length) {
        return t('empty');
      }
    },
  },
  mounted() {
    this.initBscroll();
    this.debounceSearch = _debounce(this.onSearch, 350);
  },
  beforeDestroy() {
    this.bscroll && this.bscroll.destroy();
  },
  methods: {
    initBscroll() {
      if (this.inDesigner()) return;

      this.bscroll = new BScroll(this.$refs.scroll, {
        scrollY: true,
        bounceTime: 500,
        useTransition: false,
        click: true,

        pullDownRefresh: this.pullRefresh
          ? {
              threshold: THRESHOLD,
              stop: STOP,
            }
          : false,
        pullUpLoad: true,
      });

      if (this.pullRefresh) {
        this.bscroll.on('pullingDown', this.pullingDownHandler);
        this.bscroll.on('enterThreshold', this.pullDownEnterThresholdHandler);
        this.bscroll.on('leaveThreshold', this.pullDownLeaveThresholdHandler);
      }

      this.bscroll.on('pullingUp', this.pullingUpHandler);
    },

    pullDownEnterThresholdHandler() {
      this.pullDownTip = this.pullingText;
    },
    pullDownLeaveThresholdHandler() {
      this.pullDownTip = this.loosingText;
    },

    async pullingDownHandler() {
      this.pullDownTip = '正在刷新...';
      await this.reload();
      this.pullDownTip = this.successText;

      this.bscroll.finishPullDown();
    },

    async pullingUpHandler() {
      if (this.hasMore && this.pageable === 'auto-more') {
        await this.loadMore();
      }
      this.bscroll.finishPullUp();
    },

    onSearch() {
      this.setFilter();
    },

    onSelectItem(event) {
      const { value, selected } = event;

      // 当前选中，需要取消选中
      if (selected) {
        if (this.multiple) {
          this.currentValue = this.currentValue.filter((v) => {
            return v !== value;
          });
        } else {
          this.currentValue = undefined;
        }
      } else if (this.multiple) {
        this.currentValue = [...this.currentValue, value];
      } else {
        this.currentValue = value;
      }

      this.$emit('update:value', this.currentValue);
    },

    onPaginationChange(page) {
      if (this.fetchLoading) return;

      this.setPage({
        page,
        size: this.currentPageSize,
      })
    },

    renderSearch() {
      if (!this.filterable) return null;

      return (
        <Search
          // shape="round"
          class={bem('search')}
          vModel={this.filterText}
          placeholder={this.placeholder}
          clearable={this.clearable}
          leftIcon={false}
          onInput={this.debounceSearch}
        />
      );
    },

    listRender() {
      return this.data.map((item, index) => {
        if (!item) return null;

        let slot = this.slots('item', {
          item,
          index,
        });

        if (!slot) {
          slot = [
            _get(item, this.textField),
            <EmptyCol></EmptyCol>
          ]
        }

        return (
          <ListViewItem
            key={_get(item, this.valueField)}
            value={_get(item, this.valueField)}
            selected={
              this.multiple
                ? this.value?.includes(_get(item, this.valueField))
                : this.value === _get(item, this.valueField)
            }
            onSelect={this.onSelectItem}
            striped={this.striped}
          >
            {slot}
          </ListViewItem>
        );
      });
    },
  },
  render() {
    return (
      <div class={bem()}>
        {this.renderSearch()}

        <div ref="scroll" class={bem('scroll-wrap')}>
          <div class={bem('scroll-content')}>
            {/* 下拉刷新文案 */}
            {this.pullRefresh ? (
              <div class={bem('pulldown-tips')}>
                <span>{this.pullDownTip}</span>
              </div>
            ) : null}

            {/* 列表 */}
            <div class={bem('scroll-list')} striped={this.striped}>
              {this.listRender()}
            </div>

            {/* 加载更多文案 */}
            <div vShow={this.pullUpTipVisible} class={bem('pullup-tips')}>
              <span>{this.pullUpTip}</span>
            </div>
          </div>
        </div>

        {this.pageable === 'pagination' ? (
          <div class={bem('pagination')}>
            <van-pagination
              value={this.currentPageNumer}
              items-per-page={this.currentPageSize}
              total-items={this.total}
              mode="simple"
              onChange={this.onPaginationChange}
            >
              <div class={bem('prev')} slot="prev-text" vusion-slot-name="prev">
                {this.slots('prev') || <EmptyCol></EmptyCol>}
              </div>
              <div class={bem('next')} slot="next-text" vusion-slot-name="next">
                {this.slots('next') || <EmptyCol></EmptyCol>}
              </div>
            </van-pagination>
          </div>
        ) : null}
      </div>
    );
  },
});
