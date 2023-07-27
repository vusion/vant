import _get from 'lodash/get'

// Utils
import { createNamespace } from '../utils';
import Picker from './Picker';
import Popup from '../popup';
import Field from '../field';
import Search from '../search';

import { FieldMixin } from '../mixins/field';
import DataSourceMixin from '../mixins/DataSource';


const [createComponent, bem, t] = createNamespace('pickerson');

export default createComponent({
  mixins: [FieldMixin, DataSourceMixin],
  props: {
    columnsprop: [Array, String],
    pvalue: [String, Object],
    labelField: {
      type: String,
      default: '',
    },
    inputAlign: String,
    closeOnClickOverlay: Boolean,

    pageable: { type: [Boolean, String], default: false },
    filterable: { type: Boolean, default: false },
    sorting: Object,
  },

  data() {
    return {
      valuepopup: false,
      // 内部值
      curValue: this.pvalue || '',
    };
  },

  computed: {
    data() {
      return this.currentData || this.columnsprop || [];
    },
  },
  watch: {
    curValue() {},
    // 监听props变化
    pvalue(val, old) {
      this.curValue = val;
    },
  },

  methods: {
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    getTitle() {
      if (this.ifDesigner()) return this.pvalue;

      let title = '';
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

        if (this.curValue === v) {
          title = t;
          break;
        }
      }

      return title;
    },
    togglePopup() {
      this.$refs.popforpison.togglePModal();
    },
    onChange(vm, val, index) {
      // this.curValue = val;
      this.$emit('change', vm, val, index);
    },
    onConfirm(val, index) {
      this.curValue = val;
      this.$emit('update:pvalue', val);
      this.$emit('confirm', val, index);
    },
    onCancel() {
      this.$emit('cancel');
    },
    onScrolltolower() {
      console.log('到底了');
      // 不分页
      if (!this.pageable) return;
      // 加载中
      if (this.currentLoading) return;

      if (this.currentDataSource && this.currentDataSource.hasMore()) {
        this.debouncedLoad(true);
      }
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
      scrolltolower: this.onScrolltolower,
    };

    return (
      <div class={bem('wrap')}>
        <Field
          label={this.labelField}
          value={this.getTitle()}
          scopedSlots={tempSlot}
          readonly
          isLink
          input-align={this.inputAlign || 'right'}
          onClick={this.togglePopup}
          // eslint-disable-next-line no-prototype-builtins
          notitle={!this.$slots.hasOwnProperty('title')}
          insel={true}
        />
        <Popup
          safe-area-inset-bottom
          round
          ref="popforpison"
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          get-container="body" // 放body下不易出现异常情况
          // onClickOverlay={this.togglePopup}
        >
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
            value={this.curValue}
            showToolbar={this.$attrs['show-toolbar']}
            {...{ on }}
          >
            {this.filterable ? (
              <Search
                slot="columns-top"
                shape="round"
                vModel={this.filterText}
              />
            ) : null}
          </Picker>
        </Popup>
      </div>
    );
  },
});
