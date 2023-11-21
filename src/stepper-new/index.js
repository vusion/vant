import { createNamespace, isDef, addUnit } from '../utils';
import { resetScroll } from '../utils/dom/reset-scroll';
import { preventDefault } from '../utils/dom/event';
import { addNumber, formatNumber } from '../utils/format/number';
import { isNaN } from '../utils/validate/number';
import { FieldMixin } from '../mixins/field';
import { Decimal } from 'decimal.js';

const [createComponent, bem] = createNamespace('stepper-new');

const LONG_PRESS_START_TIME = 600;
const LONG_PRESS_INTERVAL = 200;

function equal(value1, value2) {
  return String(value1) === String(value2);
}

export default createComponent({
  mixins: [FieldMixin],

  props: {
    value: {
      type: [Number, String, Object],
    },
    theme: String,
    integer: Boolean,
    disabled: Boolean,
    allowEmpty: {
      type: Boolean,
      default: true,
    },
    inputWidth: [Number, String],
    buttonSize: [Number, String],
    asyncChange: Boolean,
    placeholder: String,
    disablePlus: Boolean,
    disableMinus: Boolean,
    disableInput: Boolean,
    decimalLength: { type: [Number, String], default: 40, },
    name: {
      type: [Number, String],
      default: '',
    },
    min: {
      type: [Number, String],
      default: -Infinity,
    },
    max: {
      type: [Number, String],
      default: Infinity,
    },
    step: {
      type: [Number, String],
      default: 1,
    },
    highPrecision: {
      type: Boolean,
      default: false,
    },
    defaultValue: {
      type: [Number, String],
      default: 1,
    },
    showPlus: {
      type: Boolean,
      default: true,
    },
    showMinus: {
      type: Boolean,
      default: true,
    },
    showInput: {
      type: Boolean,
      default: true,
    },
    longPress: {
      type: Boolean,
      default: true,
    },
    align: String,
  },

  data() {
    if (this.highPrecision && typeof this.value === 'object') {
      this.value += '';
    }
    const defaultValue = this.value;
    const value = this.format(defaultValue);
    if (this.ifDesigner()) {
      return {
        currentValue: this.value,
      };
    }
    if (!equal(value, this.value)) {
      this.$emit('input', value);
      this.$emit('update:value', value);
    }

    return {
      currentValue: value,
      Decimal
    };
  },

  computed: {
    minusDisabled() {
      return (
        (this.disabled) || this.disableMinus || this.currentValue <= +this.min
      );
    },

    plusDisabled() {
      return (
        (this.disabled) || this.disablePlus || this.currentValue >= +this.max
      );
    },

    inputStyle() {
      const style = {};

      if (this.inputWidth) {
        style.width = addUnit(this.inputWidth);
      }

      if (this.buttonSize) {
        style.height = addUnit(this.buttonSize);
      }
      if (this.align) {
        style.textAlign = (this.align);
      }
      return style;
    },

    buttonStyle() {
      if (this.buttonSize) {
        const size = addUnit(this.buttonSize);

        return {
          width: size,
          height: size,
        };
      }
    },
  },

  watch: {
    max: 'check',
    min: 'check',
    integer: 'check',
    decimalLength: 'check',

    // value(val) {
    //   if (!equal(val, this.currentValue)) {
    //     this.currentValue = this.format(val);
    //   }
    // },
    value: {
      handler(val, oldVal) {
        if (!equal(val, this.currentValue)) {
          this.currentValue = this.format(val);
        }
      },
      immediate: true
    },
    currentValue(val) {
      this.$emit('input', val);
      this.$emit('update:value', val);
      this.$emit('change', val, { name: this.name });

    },
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    check() {
      const val = this.format(this.currentValue);
      if (!equal(val, this.currentValue)) {
        this.currentValue = val;
      }
    },

    // formatNumber illegal characters
    formatNumber(value) {
      return formatNumber(String(value), !this.integer);
    },

    format(value) {
      if (this.allowEmpty && ['', null, undefined].indexOf(value) !== -1) {
        return value;
      }

      value = this.formatNumber(value);

      // format range
      if (!this.highPrecision) {
        value = value === '' ? 1 : +value;
      }
      value = isNaN(value) ? this.min : value;
      if (this.highPrecision) {
        if (!this.Decimal) {
          this.Decimal = Decimal.clone({ precision: 40 });
        }
        value = this.Decimal.max(this.Decimal.min(this.max, new this.Decimal(value)), this.min).toString();
      } else {
        value = Math.max(Math.min(this.max, value), this.min);
      }

      // format decimal
      if (isDef(this.decimalLength)) {
        if (this.highPrecision) {
          value = new this.Decimal(value).toString();
        }
      }

      return value;
    },

    onInput(event) {
      const { value } = event.target;

      let formatted = this.formatNumber(value);

      // limit max decimal length
      if (isDef(this.decimalLength) && formatted.indexOf('.') !== -1) {
        const pair = formatted.split('.');
        formatted = `${pair[0]}.${pair[1].slice(0, this.decimalLength)}`;
      }

      if (!equal(value, formatted)) {
        event.target.value = formatted;
      }

      // prefer number type
      if (formatted === String(+formatted)) {
        formatted = +formatted;
      }

      this.emitChange(formatted);
    },

    emitChange(value) {
      if (this.asyncChange) {
        this.$emit('input', value);
        this.$emit('change', value, { name: this.name });
        this.$emit('update:value', value);

      } else {
        this.currentValue = value;
      }
    },

    onChange() {
      const { type } = this;

      if (this.disableInput || this[`${type}Disabled`]) {
        this.$emit('overlimit', type);
        return;
      }

      let value
      const diff = type === 'minus' ? -this.step : +this.step;
      if (this.highPrecision) {
        const map = {
          minus: 'sub',
          plus: 'add',
        }
        value = new this.Decimal(String(this.currentValue))[map[type]](new this.Decimal(String(this.step)));
      } else {
        value = this.format(addNumber(+this.currentValue, diff));
      }
      this.emitChange(value);
      this.$emit(type);
    },

    onFocus(event) {
      // readonly not work in legacy mobile safari
      if (this.disableInput && this.$refs.input) {
        this.$refs.input.blur();
      } else {
        this.$emit('focus', event);
      }
    },

    onBlur(event) {
      const value = this.format(event.target.value);
      event.target.value = value;
      this.emitChange(value);
      this.$emit('blur', event);

      resetScroll();
    },

    longPressStep() {
      this.longPressTimer = setTimeout(() => {
        this.onChange();
        this.longPressStep(this.type);
      }, LONG_PRESS_INTERVAL);
    },

    onTouchStart() {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);
      this.isLongPress = false;

      this.longPressTimer = setTimeout(() => {
        this.isLongPress = true;
        this.onChange();
        this.longPressStep();
      }, LONG_PRESS_START_TIME);
    },

    onTouchEnd(event) {
      if (!this.longPress) {
        return;
      }

      clearTimeout(this.longPressTimer);

      if (this.isLongPress) {
        preventDefault(event);
      }
    },

    onMousedown(event) {
      // fix mobile safari page scroll down issue
      // see: https://github.com/youzan/vant/issues/7690
      if (this.disableInput) {
        event.preventDefault();
      }
    },
  },

  render() {
    const createListeners = (type) => ({
      on: {
        click: (e) => {
          // disable double tap scrolling on mobile safari
          e.preventDefault();
          this.type = type;
          this.onChange();
          this.$emit('click', e);
        },
        touchstart: () => {
          this.type = type;
          this.onTouchStart();
        },
        touchend: this.onTouchEnd,
        touchcancel: this.onTouchEnd,
      },
    });

    return (
      <div class={bem([this.theme])}>
        <button
          vShow={this.showMinus}
          type="button"
          style={this.buttonStyle}
          class={bem('minus', { disabled: this.minusDisabled })}
          {...createListeners('minus')}
        />
        <input
          vShow={this.showInput}
          ref="input"
          type={this.integer ? 'tel' : 'text'}
          role="spinbutton"
          class={bem('input')}
          value={this.currentValue}
          style={this.inputStyle}
          disabled={this.disabled}
          readonly={this.disableInput}
          // set keyboard in modern browsers
          inputmode={this.integer ? 'numeric' : 'decimal'}
          placeholder={this.placeholder}
          aria-valuemax={this.max}
          aria-valuemin={this.min}
          aria-valuenow={this.currentValue}
          onInput={this.onInput}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          onMousedown={this.onMousedown}
        />
        <button
          vShow={this.showPlus}
          type="button"
          style={this.buttonStyle}
          class={bem('plus', { disabled: this.plusDisabled })}
          {...createListeners('plus')}
        />
      </div>
    );
  },
});
