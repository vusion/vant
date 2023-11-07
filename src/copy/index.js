import { createNamespace } from '../utils';
import ClipboardJS from 'clipboard';
import { UTooltip } from 'cloud-ui.vusion/src/components/u-tooltip.vue';

import Empty from '../emptycol';
import Link from '../link';

const [createComponent, bem, t] = createNamespace('copy');

export default createComponent({
  components: {
    UTooltip,
    Empty,
    Link,
  },
  props: {
    value: String,
    text: { type: String, default: '复制' },
    placement: { type: String, default: 'top' },
    successText: { type: String, default: '已复制' },
    disabled: { type: Boolean, default: false },
    hideDelay: { type: Number, default: 3000 },
    feedback: { type: String, default: 'tooltip' },
  },
  data() {
    return {
      success: false,
      failed: false,
      timeoutId: undefined,
    };
  },
  destroyed() {
    clearTimeout(this.timeoutId);
  },
  methods: {
    copy() {
      if (this.disabled) return;

      this.success = ClipboardJS.copy(this.value);
      this.failed = !this.success;

      if (this.success) {
        if (this.feedback === 'toast') {
          this.$toast.show(this.successText, this.hideDelay);
        }

        this.$emit('copy', { value: this.value }, this);

        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.success = false;
          this.failed = false;
        }, this.hideDelay);
      }
    },

    renderSlot() {
      if (this.slots()) {
        return this.slots();
      }
      if (this.inDesigner()) {
        return <Empty></Empty>;
      }

      return (
        <Link disabled={this.disabled} vusion-slot-name-edit="text">
          {this.text}
        </Link>
      );
    },

    renderFeedback() {
      if (this.feedback !== 'tooltip') return null;

      return [
        <UTooltip
          placement={this.placement}
          trigger="manual"
          opened={!!this.success}
          {...{
            on: {
              'update:opened': (opened) => {
                this.success = opened;
              },
            },
          }}
        >
          {this.successText}
        </UTooltip>,
        <UTooltip
          placement={this.placement}
          trigger="manual"
          opened={!!this.failed}
          {...{
            on: {
              'update:opened': (opened) => {
                this.failed = opened;
              },
            },
          }}
        >
          {t('fail')}
        </UTooltip>,
      ];
    }
  },
  render() {
    return (
      <div class={bem()}>
        <div onClick={this.copy} vusion-slot-name="default">
          {this.renderSlot()}
        </div>
        {this.renderFeedback()}
      </div>
    )
  }
});
