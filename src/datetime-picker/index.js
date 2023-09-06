import { createNamespace } from '../utils';
import { displayFormat } from './utils';
import TimePicker from './TimePicker';
import DatePicker from './DatePicker';
import Popup from '../popup';
import Field from '../field';
import Tabs from '../tabs';
import Tab from '../tab';
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
    displayFormat: String,

    range: Boolean,
    startValue: String,
    endValue: String,
  },
  data() {
    return {
      popupVisible: false,
      cvalue: null,

      currentStartValue: null,
      currentEndValue: null,
    };
  },
  watch: {
    value(val) {
      this.cvalue = val
    },
    startValue(val) {
      this.currentStartValue = val
    },
    endValue(val) {
      this.currentEndValue = val
    }
  },
  methods: {
    getTitle() {
      if (this?.$env?.VUE_APP_DESIGNER) {
        return this.value;
      }

      if (this.value) {
        return displayFormat(this.value, this.type, this.displayFormat);
      }

      if (this.cvalue) {
        return displayFormat(this.cvalue, this.type, this.displayFormat);
      }

      return '';

      // FIXME：下面逻辑真奇怪啰里八嗦
      // if (this.value && !this.cvalue) {
      //   return displayFormat(this.value, this.type);
      // }
      // if (!this.cvalue) return '';
      // return displayFormat(this.cvalue, this.type);
    },
    togglePopup() {
      this.popupVisible = !this.popupVisible;
    },
    // @exposed-api
    open() {
      try {
        this.popupVisible = true;
      } catch (error) {
        console.log(error);
      }
    },
    // @exposed-api
    close() {
      this.popupVisible = false;
    },
    // @exposed-api
    getPicker() {
      return this.$refs.root.getPicker();
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
            {topCancel && (
              <div onClick={this.cancel} vusion-slot-name="top-cancel">
                {topCancel}
              </div>
            )}
            {topConfirm && (
              <div onClick={this.confirm} vusion-slot-name="top-confirm">
                {topConfirm}
              </div>
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
          <button type="button" class={bem('cancel')} onClick={this.onCancel}>
            {this.cancelButtonText || t('cancel')}
          </button>
          {this.title && (
            <div class={['van-ellipsis', bem('title')]}>{this.title}</div>
          )}
          <button type="button" class={bem('confirm')} onClick={this.onConfirm}>
            {this.confirmButtonText || t('confirm')}
          </button>
        </div>
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
              onClick={this.cancel}
              // vusion-click-enabled
              vusion-slot-name="bottom-cancel"
            >
              {bottomCancel}
            </div>
          )}
          {bottomConfirm && (
            <div
              onClick={this.confirm}
              // vusion-click-enabled
              vusion-slot-name="bottom-confirm"
            >
              {bottomConfirm}
            </div>
          )}
        </div>
      );
    },
    renderContent() {
      const Component = this.type === 'time' ? TimePicker : DatePicker;

      if (this.range) {
        return (
          <Tabs
            line-width="150px">
            <Tab title="开始">
              <Component
                ref="start"
                class={bem()}
                scopedSlots={this.$scopedSlots}
                {...{
                  props: this.$props,
                  on: {
                    ...this.$listeners,
                    'update:cvalue': (v) => {
                      this.cvalue = v;
                    },
                  },
                }}
              />
            </Tab>
            <Tab
              style={{ flex: '0 0 20px' }}
              title="至"
              disabled></Tab>
            <Tab title="结束">
              <Component
                ref="end"
                class={bem()}
                scopedSlots={this.$scopedSlots}
                {...{
                  props: this.$props,
                  on: {
                    ...this.$listeners,
                    'update:cvalue': (v) => {
                      this.cvalue = v;
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
              props: this.$props,
              on: {
                ...this.$listeners,
                'update:cvalue': (v) => {
                  this.cvalue = v;
                },
              },
            }}
          />
      )
    }
  },

  render() {
    const tempSlot = {
      title: () => this.slots('title'),
    };
    return (
      <div
        class={bem('wrapppdtpicker')}
        vusion-click-enabled
        onClick={this.togglePopup}
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
