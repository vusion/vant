import { createNamespace, addUnit } from '../utils';
import { CheckboxMixin } from '../mixins/checkbox';

const [createComponent, bem] = createNamespace('radio');

export default createComponent({
  mixins: [
    CheckboxMixin({
      bem,
      role: 'radio',
      parent: 'vanRadio',
    }),
  ],

  props: {
    icon: {
      type: String,
      default: 'success',
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    currentHasIcon() {
      if (this.hasIcon === true) return this.hasIcon;
      return this.parent.hasIcon;
    },
    currentIcon() {
      return this.icon || this.parent.icon;
    },
    currentValue: {
      get() {
        return this.parent ? this.parent.datatemp : this.value;
      },

      set(val) {
        if (this.parent) {
          this.parent.datatemp = val;
        } else {
          this.$emit('input', val);
          this.$emit('update:value', val);
        }
        // (this.parent || this).$emit('input', val);
        // (this.parent || this).$emit('update:value', val);
      },
    },

    checked() {
      // fixme: 不清楚需不需要隐式转化
      // eslint-disable-next-line eqeqeq
      return this.currentValue == this.name;
    },
  },

  methods: {
    toggle() {
      this.currentValue = this.name;
    },
  },

  genIcon() {
    const { checked } = this;
    const iconSize = this.iconSize || (this.parent && this.parent.iconSize);

    return (
      <div
        ref="icon"
        class={bem('icon', [
          this.shape,
          { disabled: this.isDisabled, checked },
        ])}
        style={{ fontSize: addUnit(iconSize) }}
      >
        {this.slots('icon', { checked }) || (
          <Icon name={this.currentIcon} style={this.iconStyle} />
        )}
      </div>
    );
  },

  render() {
    let Children = [];

    if (this.currentHasIcon) {
      Children = [this.genIcon()];
    }

    if (this.labelPosition === 'left') {
      Children.unshift(this.genLabel());
    } else {
      Children.push(this.genLabel());
    }

    return (
      <div
        role="radio"
        class={bem([
          {
            disabled: this.isDisabled,
            'label-disabled': this.labelDisabled || this.isDisabled,
            noIcon: !this.currentHasIcon,
            checked: this.checked,
          },
          this.direction,
        ])}
        tabindex={this.tabindex}
        aria-checked={String(this.checked)}
        onClick={this.onClick}
      >
        {Children}
      </div>
    );
  },
});
