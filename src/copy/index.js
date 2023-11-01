import { createNamespace } from '../utils';
import ClipboardJS from 'clipboard';
import Empty from '../emptycol';

import Link from '../link';

import { UTooltip } from 'cloud-ui.vusion/src/components/u-tooltip.vue';

const [createComponent, bem, t] = createNamespace('copy');

export default createComponent({
  components: { Empty, UTooltip, Link },
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
    return { success: false, timeoutId: undefined, failed: false };
  },
  destroyed() {
    clearTimeout(this.timeoutId);
  },
  methods: {
    copy() {
      if (this.disabled) return;

      this.success = ClipboardJS.copy(this.value);

      if (this.success) {
        if (this.feedback === 'toast') {
          this.$toast.show(this.successText, this.hideDelay);
        }

        this.$emit('copy', { value: this.value }, this);
        clearTimeout(this.timeoutId);

        this.timeoutId = setTimeout(() => {
          this.success = false;
        }, this.hideDelay);
      }
      this.failed = !this.success;
    },

    renderSlot() {
      if (this.slots()) {
        return this.slots();
      } if (this.inDesigner()) {
        return <Empty></Empty>
      }

      return (
        <Link disabled={this.disabled} vusion-slot-name-edit="text">
          {this.text}
        </Link>
      );
    }
  },

  render() {
    return (
      <div class={bem()}>
        <div onClick={this.copy} vusion-slot-name="default">
          {this.renderSlot()}
        </div>

        {this.feedback === 'tooltip' && (
          <UTooltip
            placement={this.placement}
            trigger="manual"
            vModel:opened={this.success}
          >
            {this.successText}
          </UTooltip>
        )}

        <UTooltip
          placement={this.placement}
          trigger="manual"
          vModel:opened={this.failed}>
          无复制对象
        </UTooltip>
      </div>
    );
  }
});
