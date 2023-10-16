
// Utils
import { createNamespace, _get } from '../utils';
import Picker from './Picker';
import Popup from '../popup';
import Field from '../field';
import Search from '../search';
import List from './List';

import { FieldMixin } from '../mixins/field';
import DataSourceMixin from '../mixins/DataSource';

const [createComponent, bem, t] = createNamespace('pickerson');

export default createComponent({
  mixins: [FieldMixin, DataSourceMixin],
  props: {
    readonly: Boolean,
    disabled: Boolean,
    columnsprop: [Array, String],
    pvalue: [String, Object], // 废弃
    value: [String, Object],
    labelField: {
      type: String,
      default: '',
    },
    inputAlign: String,
    closeOnClickOverlay: Boolean,
    showToolbar: Boolean,
    cancelButtonText: {
      type: String,
      default: '取消',
    },
    title: {
      type: String,
      default: '标题',
    },
    confirmButtonText: {
      type: String,
      default: '确认',
    },
    multiple: Boolean,
    enableSelectAll: Boolean,
    enableSelectedCount: Boolean,
    type: {
      type: String,
      default: 'picker',
      validator(value) {
        return ['picker', 'list'].includes(value);
      },
    },
    placeholder: {
      type: String,
      default: '请选择'
    },

    pageable: { type: [Boolean, String], default: false },
    filterable: { type: Boolean, default: false },
    sorting: Object,
  },

  data() {
    return {
      popupVisible: false,
      // 内部值
      currentValue: this.formatValue((this.value ?? this.pvalue) || ''),
    };
  },

  computed: {
    data() {
      return this.currentData || this.columnsprop || [];
    },
  },
  watch: {
    currentValue(val) {
      this.$emit('update:value', val);
      this.$emit('update:pvalue', val);
    },
    // 监听props变化
    value(val) {
      this.currentValue = this.formatValue(val);
    },
    pvalue(val) {
      this.currentValue = this.formatValue(val);
    },
  },

  methods: {
    formatValue(value) {
      let val = value;
      if (this.multiple && !Array.isArray(value)) {
        val = [value].filter((item) => {
          if (item !== null || item !== undefined || item !== '') {
            return false
          }

          return true;
        });
      } else if (!this.multiple && Array.isArray(value)) {
        val = value[0];
      }
      return val;
    },
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    getTitle() {
      if (this.ifDesigner()) {
        return this.value ?? this.pvalue;
      }

      let title =  this.multiple ? [] : '';
      for (let i = 0; i < this.data.length; i++) {
        const item = this.data[i];

        let v;
        let t;
        if (typeof item === 'object' && item !== null) {
          v = _get(item, this.valueField);
          t = _get(item, this.textField);
        } else {
          v = item;
          t = item;
        }

        if (this.multiple) {
          if (this.currentValue.includes(v)) {
            title.push(t)
          }
        } else if (this.currentValue === v) {
          title = t;
          break;
        }
      }

      return this.multiple ? title.join('，') : title;
    },
    togglePopup() {
      this.popupVisible = !this.popupVisible;
    },
    closePopup() {
      this.popupVisible = false;
    },
    onChange(vm, val, index) {
      this.$emit('change', vm, val, index);
    },
    onConfirm() {
      this.$refs?.picker?.stopMomentum?.();
      const [value, index] = this.$refs?.picker?.getValue();

      this.currentValue = value;
      this.$emit('confirm', value, index);
      this.closePopup();
    },
    onCancel() {
      this.$emit('cancel');
      this.closePopup();
    },
    onScrollToLower() {
      console.log('到底了');
      // 不分页
      if (!this.pageable) return;
      // 加载中
      if (this.currentLoading) return;

      if (this.currentDataSource && this.currentDataSource.hasMore()) {
        this.debouncedLoad(true);
      }
    },

    genToolBar() {
      if (!this.showToolbar) {
        return null;
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

    onClickField() {
      if (this.readonly || this.disabled) {
        return;
      }

      this.togglePopup();
    },
  },

  render(h) {
    const tempSlot = {
      title: () => this.slots('title'),
    };

    const on = {
      ...this.$listeners,
      change: this.onChange,
      confirm: this.onConfirm,
      cancel: this.onCancel,
      scrolltolower: this.onScrollToLower,
    };

    return (
      <div class={bem('wrap')}>
        <Field
          label={this.labelField}
          value={this.getTitle()}
          placeholder={this.placeholder}
          scopedSlots={tempSlot}
          readonly
          disabled={this.disabled}
          isLink
          input-align={this.inputAlign || 'right'}
          onClick={this.onClickField}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          insel={true}
        />
        <Popup
          value={this.popupVisible}
          safe-area-inset-bottom
          round
          ref="popup"
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          get-container="body" // 放body下不易出现异常情况
          // onClickOverlay={this.togglePopup}
        >
          <div>
            {/* toolbar */}
            {this.genToolBar()}
            {/* search */}
            {this.filterable ? (
              <Search
                shape="round"
                vModel={this.filterText}
                placeholder="请输入搜索关键词"
              />
            ) : null}
            {!this.multiple && this.type === 'picker' && (
              <Picker
                ref="picker"
                {...{
                  attrs: {
                    ...this.$attrs,
                    columnsprop: this.data,
                    valueField: this.valueField,
                    textField: this.textField || this.$attrs.valueKey,
                  },
                }}
                value={this.currentValue}
                {...{ on }}
              ></Picker>
            )}
            {(this.multiple || this.type === 'list') && (
              <List
                ref="picker"
                data={this.data}
                valueField={this.valueField}
                textField={this.textField}
                value={this.currentValue}
                multiple={this.multiple}
                enableSelectAll={this.enableSelectAll}
                enableSelectedCount={this.enableSelectedCount}
                loading={this.currentLoading}
                {...{ on }}
              ></List>
            )}
          </div>
        </Popup>
      </div>
    );
  },
});
