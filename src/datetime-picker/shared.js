import { times, formatFu } from './utils';
import { padZero } from '../utils/format/string';
import { pickerProps } from '../picker/shared';
import Picker from '../picker';

export const sharedProps = {
  ...pickerProps,
  value: null,
  filter: Function,
  columnsOrder: Array,
  showToolbar: {
    type: Boolean,
    default: true,
  },
  formatter: {
    type: Function,
    default: (type, value) => value,
  },
  displayFormat: String,
  isNew: {
    type: Boolean,
    default: false,
  },
};

export const TimePickerMixin = {
  data() {
    return {
      innerValue: this.formatValue(this.value),
    };
  },

  computed: {
    originColumns() {
      return this.ranges.map(({ type, range: rangeArr }) => {
        let values = times(rangeArr[1] - rangeArr[0] + 1, (index) => {
          const value = padZero(rangeArr[0] + index);
          return value;
        });

        if (this.filter) {
          values = this.filter(type, values);
        }

        return {
          type,
          values,
        };
      });
    },

    columns() {
      return this.originColumns.map((column) => ({
        values: column.values.map((value) =>
          this.formatter(column.type, value)
        ),
      }));
    },
  },

  watch: {
    columns: 'updateColumnValue',

    innerValue(val, oldVal) {
      if (!oldVal) {
        this.$emit('input', null);
      } else {
        this.$emit('input', val);
      }
    },
  },

  mounted() {
    this.updateColumnValue();

    this.$nextTick(() => {
      this.updateInnerValue();
    });
  },

  methods: {
    // @exposed-api
    getPicker() {
      return this.$refs.picker;
    },

    cancel() {
      // readme: cancel->ref.cancel->oncancel
      this.$refs.picker.cancel();
    },
    confirm() {
      this.$refs.picker.confirm();
    },

    onConfirm() {
      if (this.readonly || this.disabled) {
        //
      } else {
        let value = this.innerValue;

        // 低代码可用type： date、 time、 datetime、 year-month(即将废弃)
        const isDateType = ['date', 'datetime'].includes(this.type);
        const useConverter =
          isDateType && ['json', 'timestamp', 'date'].includes(this.converter);

        if (useConverter) {
          if (this.converter === 'json') {
            value = new Date(value).toJSON();
          }
          if (this.converter === 'timestamp') {
            value = +new Date(value);
          }
          if (this.converter === 'date') {
            value = new Date(value);
          }
        } else {
          value = formatFu(this.innerValue, this.type, true);
        }

        // const isDateAndDateTime =
        //   this.type === 'datetime' || this.type === 'date';

        // const isJSONType = isDateAndDateTime && this.converter === 'json';

        // const isTimestampType =
        //   isDateAndDateTime && this.converter === 'timestamp';

        // const isDateType = isDateAndDateTime && this.converter === 'date';

        // if (isJSONType) {
        //   value = new Date(value).toJSON();
        // }

        // if (isTimestampType) {
        //   value = +new Date(value);
        // } else if (isDateType) {
        //   value = new Date(value);
        // }

        // const useConverterValue = isJSONType || isTimestampType || isDateType;

        // this.$emit('input', value);
        // this.$emit(
        //   'update:value',
        //   value
        // );

        // this.$emit('confirm', value);

        return value;
      }
    },
  },

  render() {
    const props = {};
    Object.keys(pickerProps).forEach((key) => {
      props[key] = this[key];
    });

    return (
      <Picker
        ref="picker"
        class={this.isNew ? 'van-picker--new' : ''}
        vusion-enable-click="true"
        toolbarPosition="none"
        // columns={this.columns}
        columnsprop={this.columns}
        readonly={this.readonly}
        disabled={this.disabled}
        scopedSlots={this.$scopedSlots}
        onChange={this.onChange}
        {...{ props }}
      />
    );
  },
};
