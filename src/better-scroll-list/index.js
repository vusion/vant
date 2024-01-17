import BScroll from '@better-scroll/core';
import PullDown from '@better-scroll/pull-down';
import PullUp from '@better-scroll/pull-up';

import { createNamespace } from '../utils';

BScroll.use(PullDown);
BScroll.use(PullUp);

const [createComponent, bem, t] = createNamespace('better-scroll-list');

const TIME_BOUNCE = 800;
const REQUEST_TIME = 1000;
const THRESHOLD = 70;
const STOP = 56;
const STEP = 0;

export default createComponent({
  props: {
    loading: { type: Boolean, default: false },
    hasMore: { type: Boolean, default: true },
    refreshing: { type: Boolean, default: false },
  },
  data() {
    return {
      beforePullDown: true,
      isPullingDown: false,
    };
  },
  watch: {
    refreshing(val) {
      if (val) {
        this.bscroll.autoPullDownRefresh()
      } else {
        this.bscroll.finishPullDown();
      }
    }
  },
  mounted() {
    this.initBscroll();
  },
  methods: {
    initBscroll() {
      this.bscroll = new BScroll(this.$refs.scroll, {
        scrollY: true,
        bounceTime: TIME_BOUNCE,
        useTransition: false,
        pullDownRefresh: {
          threshold: THRESHOLD,
          stop: STOP,
        },

        pullUpLoad: true,
      });

      this.bscroll.on('pullingDown', this.pullingDownHandler);
      this.bscroll.on('pullingUp', this.pullingUpHandler);
    },

    pullingUpHandler() {
      this.$emit('load-more');
    },

    pullingDownHandler() {
      this.beforePullDown = false;
      this.isPullingDown = true;
      this.$emit('refresh');
    },

    refresh() {
      this.bscroll.refresh();
    },
  },

  render() {
    return (
      <div class={bem()}>
        <div ref="scroll" class={bem('wrap')}>
          <div class={bem('content')}>
            <div class={bem('pulldown-tips')}>
              <div vShow="beforePullDown">
                <span>Pull Down and refresh</span>
              </div>
              <div vShow={this.beforePullDown}>
                <div vShow={this.isPullingDown}>
                  <span>Loading...</span>
                </div>
                <div vShow={!this.isPullingDown}>
                  <span>Refresh success</span>
                </div>
              </div>
            </div>

            <div class={bem('list')}>{this.slots()}</div>
          </div>
        </div>
      </div>
    );
  },
});
