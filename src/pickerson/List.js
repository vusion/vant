import _get from 'lodash/get';
import _debounce from 'lodash/debounce';
import _cloneDeep from 'lodash/cloneDeep';

import List from '../list'
import Iconv from '../iconv'
import Checkbox from '../checkbox'

// Utils
import { createNamespace } from '../utils';

const [createComponent, bem, t] = createNamespace('picker-list');

export default createComponent({
  props: {
    data: Array,
    value: [String, Number, Array],
    // 值字段
    valueField: { type: String, default: 'value' },
    // 文本字段
    textField: { type: String, default: 'text' },

    multiple: {
      type: Boolean,
      default: false,
    },

    loading: Boolean,
  },
  data() {
    return {
      currentValue: _cloneDeep(this.value),
    };
  },
  watch: {
    value(val) {
      this.currentValue = _cloneDeep(val);
    },
    // currentValue(val) {
    //   this.$emit('update:value', val)
    // }
  },
  methods: {
    selectAll(cancel) {
      if (cancel) {
        this.currentValue = []
        return;
      }

      const list = []
      for (let i = 0; i < (this.data?.length || 0); i++) {
        const item = this.data[i];
        list.push(_get(item, this.valueField))
      }

      this.currentValue = list;
    },
    onSelect(value, index, item) {
      // 单选
      if (!this.multiple) {
        // eslint-disable-next-line eqeqeq
        if (this.currentValue == value) {
          this.currentValue = undefined;
        } else {
          this.currentValue = value;
        }
      } else {
        const idx = this.currentValue.indexOf(value);
        if (idx !== -1) {
          this.currentValue.splice(idx, 1);
        } else {
          this.currentValue.push(value);
        }
      }
      this.$emit('change', item, value, index);
    },
    onLoad() {
      this.$emit('scrolltolower');
    },
    // 暴露给上层调用
    getValue() {
      return [this.currentValue];
    },
  },
  render(h) {
    return (
      <div>
        <List
          ref="list"
          class={bem()}
          loading={this.loading}
          onLoad={_debounce(this.onLoad, 300)}
          offset={10}
        >
          {(this.data || []).map((item, index) => {
            const value = _get(item, this.valueField);
            // eslint-disable-next-line eqeqeq
            const checked = this.multiple
              ? this.currentValue.includes(value)
              : // eslint-disable-next-line eqeqeq
                this.currentValue == value;
            return (
              <div
                key={value}
                class={[
                  bem('item'),
                  this.multiple ? 'multiple' : 'single',
                  checked ? 'checked' : '',
                ]}
                onClick={() => this.onSelect(value, index, item)}
              >
                {this.multiple && (
                  <div class="icon">
                    <Checkbox value={checked} shape="square">
                      <div class={{ text: true, checked }}>
                        {_get(item, this.textField)}
                      </div>
                    </Checkbox>
                  </div>
                )}

                {!this.multiple && (
                  <div class={{ text: true, checked }}>
                    {_get(item, this.textField)}
                  </div>
                )}

                {/* 单选 */}
                {checked && !this.multiple && (
                  <div class="icon">
                    <Iconv name="sure"></Iconv>
                  </div>
                )}
              </div>
            );
          })}
        </List>
        {this.multiple && (
          <div class={bem('count')}>
            当前已选中 <span class="number">{this.currentValue?.length}</span>{' '}
            项
            {this.currentValue.length === this.data.length ? (
              <span class="handler" onClick={() => this.selectAll(true)}>
                取消全选
              </span>
            ) : (
              <span class="handler" onClick={() => this.selectAll()}>
                全选
              </span>
            )}
          </div>
        )}
      </div>
    );
  },
});
