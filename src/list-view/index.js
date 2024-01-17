import _get from 'lodash/get';
import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import PullUp from '@better-scroll/pull-up';

import { createNamespace } from '../utils';
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
      pullDownTip: '',
    };
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.bscroll.refresh();
      });
    },
  },
  computed: {
    pullUpTip() {
      if (this.currentLoading) {
        return this.loadingText;
      }

      if (this.currentError) {
        return this.errorText;
      }

      if (this.hasMore && this.pageable === 'load-more') {
        return t('loadMore');
      }

      if (!this.hasMore && ['auto-more', 'load-more'].includes(this.pageable)) {
        return t('noMore');
      }

      if (!this.data?.length) {
        return t('empty');
      }
    },
  },
  mounted() {
    this.initBscroll();
  },
  beforeDestroy() {
    this.bscroll.destroy();
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroll, {
        scrollY: true,
        bounceTime: 500,
        useTransition: false,

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

    renderSearch() {
      if (!this.filterable) return null;

      return (
        <Search shape="round" vModel={this.filterText} />
      );
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
            <div class={bem('scroll-list')}>
              {this.data.map((item, index) => {
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
            </div>

            {/* 加载更多文案 */}
            <div class={bem('pullup-tips')}>
              <span>{this.pullUpTip}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
});
