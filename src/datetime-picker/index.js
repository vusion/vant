import { createNamespace } from '../utils';
import { displayFormat } from './utils';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import Popup from '../popup';
import Field from '../field';
import Tabs from '../tabs';
import Tab from '../tab';
import { EmptyCol } from '../emptycol';
import { FieldMixin } from '../mixins/field';

const [createComponent, bem, t] = createNamespace('datetime-picker');

export default createComponent({
  mixins: [FieldMixin],

  props: {
    ...TimePicker.props,
    ...DatePicker.props,
    labelField: {
      type: String,
      default: '',
    },
    inputAlign: String,
    closeOnClickOverlay: Boolean,

    range: Boolean,
    startValue: String,
    endValue: String,
  },
  data() {
    return {
      popupVisible: false,

      currentValue: this.value,
      currentStartValue: this.startValue,
      currentEndValue: this.endValue,

      // 临时值，用于记录区间change时的变化值
      tempStartValue: this.startValue,
      tempEndValue: this.endValue,
    };
  },
  watch: {
    currentValue(val) {
      this.$emit('update:value', val);
    },
    value(val) {
      this.currentValue = val;
    },

    // range value
    currentStartValue(val) {
      this.$emit('update:startValue', val);
    },
    startValue(val) {
      this.currentStartValue = val;
      this.tempStartValue = val;
    },
    currentEndValue(val) {
      this.$emit('update:endValue', val);
    },
    endValue(val) {
      this.currentEndValue = val;
      this.tempEndValue = val;
    },
  },
  methods: {
    getTitle() {
      if (this?.$env?.VUE_APP_DESIGNER) {
        return this.range
          ? `${this.startValue} - ${this.endValue}`
          : this.value;
      }

      if (this.range) {
        let startTitle = '';
        let endTitle = '';

        if (this.startValue) {
          startTitle = displayFormat(
            this.startValue,
            this.type,
            this.displayFormat
          );
        } else if (this.currentStartValue) {
          startTitle = displayFormat(
            this.currentStartValue,
            this.type,
            this.displayFormat
          );
        }

        if (this.endValue) {
          endTitle = displayFormat(
            this.endValue,
            this.type,
            this.displayFormat
          );
        } else if (this.currentEndValue) {
          endTitle = displayFormat(
            this.currentEndValue,
            this.type,
            this.displayFormat
          );
        }

        return (startTitle || endTitle) ? `${startTitle} - ${endTitle}` : '';
      }

      // not range
      if (this.value) {
        return displayFormat(this.value, this.type, this.displayFormat);
      }

      if (this.currentValue) {
        return displayFormat(this.currentValue, this.type, this.displayFormat);
      }

      return '';
    },
    togglePopup() {
      this.popupVisible = !this.popupVisible;
      // this.$refs.popup.toggle()
    },
    // @exposed-api
    open() {
      this.popupVisible = true;
      // this.$refs.popup.open();
    },
    // @exposed-api
    close() {
      this.popupVisible = false;
      // this.$refs.popup.close();
    },
    // @exposed-api
    getPicker() {
      return this.$refs.root.getPicker();
    },
    onConfirm(value) {
      this.$emit('comfirm', value);
    },
    confirm() {
      if (this.range) {
        // date、datetime
        const { start, end } = this.$refs;
        const startValue = start.onConfirm()
        const endValue = end.onConfirm()

        this.currentStartValue = startValue;
        this.currentEndValue = endValue;
        this.onConfirm({
          start: startValue,
          end: endValue,
        });
      } else {
        const { root } = this.$refs;
        const value = root.onConfirm();
        this.currentValue = value;
        this.onConfirm(value);
      }

      this.close();
    },
    onCancel() {
      this.$emit('cancel');
    },
    cancel() {
      this.onCancel();
      this.close();
    },
    genToolBar() {
      if (this.isNew) {
        let topCancel = this.slots('top-cancel');
        let topConfirm = this.slots('top-confirm');
        let titleSlot = this.slots('title');
        if (this.inDesigner) {
          if (!topCancel) {
            topCancel = <EmptyCol></EmptyCol>;
          }
          if (!topConfirm) {
            topConfirm = <EmptyCol></EmptyCol>;
          }
          if (!titleSlot) {
            titleSlot = <EmptyCol></EmptyCol>;
          }
        }
        return (
          <div style="display:flex; justify-content: space-between; align-items: center; position: relative;">
            {topCancel && <div vusion-slot-name="top-cancel">{topCancel}</div>}
            {topConfirm && (
              <div vusion-slot-name="top-confirm">{topConfirm}</div>
            )}
            <div
              style="position:absolute; top: 50%; left:50%; transform: translate(-50%,-50%);"
              vusion-slot-name="title"
            >
              {titleSlot || this.title}
            </div>
          </div>
        );
      }

      return (
        <div class={bem('toolbar')}>
          <button type="button" class={bem('cancel')} onClick={this.cancel}>
            {this.cancelButtonText || t('cancel')}
          </button>
          {this.title && (
            <div class={['van-ellipsis', bem('title')]}>{this.title}</div>
          )}
          <button type="button" class={bem('confirm')} onClick={this.confirm}>
            {this.confirmButtonText || t('confirm')}
          </button>
        </div>
      );
    },
    renderContent() {
      const Component = this.type === 'time' ? TimePicker : DatePicker;

      if (this.range) {
        return (
          <Tabs line-width="150px">
            <Tab title="开始">
              <Component
                ref="start"
                class={bem()}
                scopedSlots={this.$scopedSlots}
                {...{
                  props: {
                    ...this.$props,
                    value: this.currentStartValue,
                    maxDate: this.tempEndValue ?? this.$props.maxDate,
                  },
                  on: {
                    change: (picker, value) => {
                      this.tempStartValue = value;
                    },
                  },
                }}
              />
            </Tab>
            <Tab style={{ flex: '0 0 20px' }} title="至" disabled></Tab>
            <Tab title="结束">
              <Component
                ref="end"
                class={bem()}
                scopedSlots={this.$scopedSlots}
                {...{
                  props: {
                    ...this.$props,
                    value: this.currentEndValue,
                    // 当currentStartValue存在时，使用
                    minDate: this.tempStartValue ?? this.$props.minDate,
                  },
                  on: {
                    change: (picker, value) => {
                      this.tempEndValue = value;
                    },
                  },
                }}
              />
            </Tab>
          </Tabs>
        );
      }

      return (
        <Component
          ref="root"
          class={bem()}
          scopedSlots={this.$scopedSlots}
          {...{
            props: {
              ...this.$props,
              value: this.currentValue,
            },
          }}
        />
      );
    },
    renderBottom() {
      if (!this.isNew) return null;

      let bottomCancel = this.slots('bottom-cancel');
      let bottomConfirm = this.slots('bottom-confirm');
      if (this.inDesigner) {
        if (!bottomCancel) {
          bottomCancel = <EmptyCol></EmptyCol>;
        }
        if (!bottomConfirm) {
          bottomConfirm = <EmptyCol></EmptyCol>;
        }
      }

      if (!bottomCancel && !bottomConfirm) return null;

      return (
        <div style="display:flex; justify-content: space-between; align-items:center;">
          {bottomCancel && (
            <div
              // vusion-click-enabled
              vusion-slot-name="bottom-cancel"
            >
              {bottomCancel}
            </div>
          )}
          {bottomConfirm && (
            <div
              // vusion-click-enabled
              vusion-slot-name="bottom-confirm"
            >
              {bottomConfirm}
            </div>
          )}
        </div>
      );
    },
  },

  render() {
    const tempSlot = {
      title: () => this.slots('title'),
    };
    return (
      <div
        class={bem('wrapppdtpicker')}
        vusion-click-enabled
        onClick={this.open}
      >
        <Field
          label={this.labelField}
          value={this.getTitle()}
          scopedSlots={tempSlot}
          readonly
          isLink
          input-align={this.inputAlign || 'right'}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          insel={true}
          nofi={true}
        />
        <Popup
          ref="popup"
          get-container="body" // 放body下不易出现异常情况
          safe-area-inset-bottom
          onClick={(event) => {
            if (event && event.stopPropagation) {
              event.stopPropagation();
            }
          }}
          round
          value={this.popupVisible}
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          // onClickOverlay={this.togglePopup}
        >
          {this.genToolBar()}
          {this.renderContent()}
          {this.renderBottom()}
        </Popup>
      </div>
    );
  },
});
