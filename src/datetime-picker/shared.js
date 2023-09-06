import { times, formatFu } from './utils';
import { padZero } from '../utils/format/string';
import { pickerProps } from '../picker/shared';
import Picker from '../picker';
import { EmptyCol } from '../emptycol';

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
    inDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
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
        const isDateAndDateTime =
          this.type === 'datetime' || this.type === 'date';
        const isJSONType = isDateAndDateTime && this.converter === 'json';
        const isTimestampType =
          isDateAndDateTime && this.converter === 'timestamp';
        const isDateType = isDateAndDateTime && this.converter === 'date';

        if (isJSONType) {
          value = new Date(value).toJSON();
        }
        if (isTimestampType) {
          value = +new Date(value);
        } else if (isDateType) {
          value = new Date(value);
        }

        const useConverterValue = isJSONType || isTimestampType || isDateType;

        this.$emit('input', value);
        // this.$emit('update:value', this.type==="datetime" ? value.formath("yyyy/MM/dd HH:mm:ss") : value);
        this.$emit(
          'update:value',
          useConverterValue ? value : formatFu(this.innerValue, this.type, true)
        );
        this.$emit(
          'update:cvalue',
          useConverterValue ? value : formatFu(this.innerValue, this.type)
        );
        this.$emit('confirm', value);
      }
      try {
        this.$parent.$parent.togglePopup();
      } catch (error) {
        //
      }
    },

    onCancel() {
      this.$emit('cancel');
      try {
        this.$parent.$parent.togglePopup();
      } catch (error) {}
    },

    genColumnsTop() {
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
        <template slot="columns-top">
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
        </template>
      );
    },

    genColumnsBottom() {
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
        <template slot="columns-bottom">
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
        </template>
      );
    },

    renderForNew(props) {
      return (
        <Picker
          ref="picker"
          // columns={this.columns}
          columnsprop={this.columns}
          readonly={this.readonly}
          disabled={this.disabled}
          onChange={this.onChange}
          onConfirm={this.onConfirm}
          onCancel={this.onCancel}
          {...{ props }}
          toolbarPosition="none"
          class="van-picker--new"
          vusion-enable-click="true"
        >
          {/* {this.genColumnsTop()} */}
          {/* {this.genColumnsBottom()} */}
        </Picker>
      );
    },
  },

  render() {
    const props = {};
    Object.keys(pickerProps).forEach((key) => {
      props[key] = this[key];
    });

    // if (this.isNew) {
    //   return this.renderForNew(props);
    // }

    return (
      <Picker
        ref="picker"
        vusion-enable-click="true"
        toolbarPosition="none"
        // columns={this.columns}
        columnsprop={this.columns}
        readonly={this.readonly}
        disabled={this.disabled}
        scopedSlots={this.$scopedSlots}
        onChange={this.onChange}
        onConfirm={this.onConfirm}
        onCancel={this.onCancel}
        {...{ props }}
      />
    );
  },
};
