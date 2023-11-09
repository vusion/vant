import { createNamespace } from '../utils';
import ClipboardJS from 'clipboard';

import Popover from '../popover';
import Empty from '../emptycol';
import Link from '../link';

const [createComponent, bem, t] = createNamespace('copy');

export default createComponent({
  components: {
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
      popoverVisible: false,
      failed: false,
      timeoutId: undefined,
    };
  },
  computed: {
    popoverText() {
      if (this.failed) {
        return t('fail');
      }

      return this.successText
    }
  },
  destroyed() {
    clearTimeout(this.timeoutId);
  },
  methods: {
    copy() {
      if (this.disabled) return;

      const isSuccess = ClipboardJS.copy(this.value);
      this.failed = !isSuccess;
      this.popoverVisible = true;

      if (isSuccess) {
        if (this.feedback === 'toast') {
          this.$toast.show(this.successText, this.hideDelay);
        }

        this.$emit('copy', { value: this.value }, this);

        clearTimeout(this.timeoutId);
        this.timeoutId = setTimeout(() => {
          this.failed = false;
          this.popoverVisible = false;
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
  },
  render() {
    return (
      <div class={bem()}>
        {this.feedback === 'tooltip' ? (
          <Popover
            theme="dark"
            placement="top"
            vModel={this.popoverVisible}
          >
            <div class={bem('tip')}>{this.popoverText}</div>
            <template slot="reference">
              <div onClick={this.copy} vusion-slot-name="default">
                {this.renderSlot()}
              </div>
            </template>
          </Popover>
        ) : (
          <div onClick={this.copy} vusion-slot-name="default">
            {this.renderSlot()}
          </div>
        )}
      </div>
    );
  }
});
