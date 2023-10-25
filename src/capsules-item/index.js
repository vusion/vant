import { createNamespace } from '../utils';
import { ChildrenMixin } from '../mixins/relation';
import Empty from '../emptycol';

const [createComponent, bem] = createNamespace('capsules-item');

export default createComponent({
  mixins: [ChildrenMixin('VanCapsules')],
  components: {
    Empty,
  },
  props: {
    value: String,
    label: String,
    flag: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    active() {
      if ([undefined].includes(this.value)) {
        return false;
      }

      if (this.parent.multiple) {
        return (this.parent.currentValue || []).indexOf(this.value) !== -1;
      }

      return this.parent.currentValue === this.value;
    },
    isDisabled() {
      return this.parent.disabled || this.disabled;
    },
  },

  methods: {
    onSelect() {
      if (this.parent.disabled || this.parent.readonly) {
        return;
      }

      if (this.disabled) {
        return;
      }

      this.parent.onSelect(this.value);
      this.$emit('select', this.value);
    },
    renderSlots() {
      if (this.inDesigner() && !this.slots()) {
        return <Empty></Empty>;
      }

      return this.slots();
    },

    renderLabel() {
      if (!this.label) return null;

      return <div class={bem('label')}>{this.label}</div>;
    },
  },

  render() {
    return (
      <div
        class={bem()}
        active={this.active}
        disabled={this.isDisabled}
        flag={this.flag}
        onClick={this.onSelect}
      >
        {this.renderSlots()}
        {this.renderLabel()}
      </div>
    );
  },
});
