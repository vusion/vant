import { createNamespace, isFunction } from '../utils';
import Tab from '../tab';
import Tabs from '../tabs';
import Icon from '../icon';
import Popup from '../popup';
import Field from '../field';

// Mixins
import { FieldMixin } from '../mixins/field';

const _ = require('lodash');

const [createComponent, bem, t] = createNamespace('cascader');

export default createComponent({
  mixins: [FieldMixin],

  props: {
    title: String,
    value: [Number, String],
    fieldNamesp: [Object, String],
    placeholder: {type: String, default: '请选择'},
    activeColor: String,
    dataSource: {
      type: Array,
      default: () => [],
    },
    closeable: {
      type: Boolean,
      default: true,
    },
    converter: {
      type: String,
      default: 'json'
    },
    labelField: {
      type: String,
    },
    textField: String,
    valueField: String,
    childrenField: String,
    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
    novalue: {
      type: Boolean,
      default: false,
    },
    notitleblock: {
      type: Boolean,
      default: false,
    },
    inputAlign: String,
  },

  data() {
    return {
      tabs: [],
      activeTab: 0,
      options: [],
      valuepopup: false,
      curValue: this.value || ''
    };
  },

  computed: {
    fieldNames() {
      if (this.fieldNamesp === null || this.fieldNamesp === undefined) return {};
      if(typeof this.fieldNamesp === 'string') return JSON.parse(this.fieldNamesp || '{}');
      if(typeof this.fieldNamesp === 'object') return this.fieldNamesp;
    },
    textKey() {
      return this.textField || this.fieldNames?.text ||  'text';
    },
    valueKey() {
      return this.valueField || this.fieldNames?.value ||  'value';
    },
    childrenKey() {
      return this.childrenField || this.fieldNames?.children || 'children';
    },
  },

  watch: {
    dataSource: {
      deep: true,
      handler: 'updateTabs',
    },
    value(val) {
      this.curValue = val;
    },
    curValue(value) {
      if (value || value === 0) {
        const values = this.tabs.map(
          (tab) => {
            if (tab.selectedOption) {
              // return tab.selectedOption?.[this.valueKey];
              return _.get(tab.selectedOption, this.valueKey);
            }
            return tab.selectedOption;
          }
        );
        if (values.indexOf(value) !== -1) {
          return;
        }
      }
      this.updateTabs();
    },
  },

  created() {
    this.updateTabs();
  },

  methods: {
    getTitle() {
      const ifDesigner = (this.$env && this.$env.VUE_APP_DESIGNER);
      if (ifDesigner) {
        return this.value;
      }
      const selectedOptions = this.getSelectedOptionsByValue(
        this.options,
        this.curValue
      ) || [];
      const result = selectedOptions
        .map((option) => _.get(option, this.textKey))
        .join('/');
      return result;
    },
    getSelectedOptionsByValue(options, value) {
      for (let i = 0; i < options.length; i++) {
        const option = options[i];

        if (_.get(option, this.valueKey) === value) {
          return [option];
        }

        if (option[this.childrenKey]) {
          const selectedOptions = this.getSelectedOptionsByValue(
            option[this.childrenKey],
            value
          );
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    },
    fromValue(value) {
      if (this.converter === 'json')
          try {
            if (value === null || value === undefined) return [];
            if(typeof value === 'string') return JSON.parse(value || '[]');
            if(typeof value === 'object') return value;
          } catch (err) {
              return [];
          }
        else
            return value || [];
    },
    async updateTabs() {
      if (isFunction(this.dataSource)) {
        try {
          const res = await this.dataSource({
            page: 1,
            size: 1000
          });
          this.options = res.content;
        } catch (error) {
          console.error(error);
        }
      } else {
        this.options = this.fromValue(this.dataSource);
      }
      if (this.curValue || this.curValue === 0) {
        const selectedOptions = this.getSelectedOptionsByValue(
          this.options,
          this.curValue
        );

        if (selectedOptions) {
          let optionsCursor = this.options;

          this.tabs = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selectedOption: option,
            };

            const next = optionsCursor.filter(
              (item) => _.get(item, this.valueKey) === _.get(option, this.valueKey)
            );
            if (next.length) {
              optionsCursor = next[0][this.childrenKey];
            }

            return tab;
          });

          if (optionsCursor) {
            this.tabs.push({
              options: optionsCursor,
              selectedOption: null,
            });
          }

          this.$nextTick(() => {
            this.activeTab = this.tabs.length - 1;
          });

          return;
        }
      }

      this.tabs = [
        {
          options: this.options,
          selectedOption: null,
        },
      ];
    },

    onSelect(option, tabIndex) {
      this.tabs[tabIndex].selectedOption = option;

      if (this.tabs.length > tabIndex + 1) {
        this.tabs = this.tabs.slice(0, tabIndex + 1);
      }

      if (option[this.childrenKey]) {
        const nextTab = {
          options: option[this.childrenKey],
          selectedOption: null,
        };

        if (this.tabs[tabIndex + 1]) {
          this.$set(this.tabs, tabIndex + 1, nextTab);
        } else {
          this.tabs.push(nextTab);
        }

        this.$nextTick(() => {
          this.activeTab++;
        });
      }

      const selectedOptions = this.tabs
        .map((tab) => tab.selectedOption)
        .filter((item) => !!item);

      const eventParams = {
        value: _.get(option, this.valueKey),
        tabIndex,
        selectedOptions,
      };
      this.curValue = _.get(option, this.valueKey);
      this.$emit('input', _.get(option, this.valueKey));
      this.$emit('update:value', _.get(option, this.valueKey));
      this.$emit('change', eventParams);

      if (!option[this.childrenKey]) {
        this.$emit('finish', eventParams);
        // if (this.$parent) {
        //   this.$parent.realValue = false;
        // }
        this.togglePopup();
      }
    },

    onClose() {
      this.$emit('close');
    },
    togglePopup() {
      this.valuepopup = !this.valuepopup;
      this.$refs.popforcas.togglePModal();
    },

    renderHeader() {
      return (
        <div class={bem('header')}>
          <h2 class={bem('title')}>{this.slots('title') || this.title}</h2>
          {this.closeable ? (
            <Icon
              name="cross"
              class={bem('close-icon')}
              onClick={this.onClose}
            />
          ) : null}
        </div>
      );
    },

    renderOptions(options, selectedOption, tabIndex) {
      const renderOption = (option) => {
        const isSelected =
          selectedOption && (_.get(option, this.valueKey) === _.get(selectedOption, this.valueKey))
          // option[this.valueKey] === selectedOption[this.valueKey];
          // console.log(option);
        const Text = this.slots('option', { option, selected: isSelected }) || (
          <span>{_.get(option, this.textKey)}</span>
        );

        return (
          <li
            class={bem('option', { selected: isSelected })}
            style={{ color: isSelected ? this.activeColor : null }}
            onClick={() => {
              this.onSelect(option, tabIndex);
            }}
          >
            {Text}
            {isSelected ? (
              <Icon name="success" class={bem('selected-icon')} />
            ) : null}
          </li>
        );
      };

      return <ul class={bem('options')}>{options.map(renderOption)}</ul>;
    },

    renderTab(item, tabIndex) {
      const { options, selectedOption } = item;
      const title = selectedOption
        ? _.get(selectedOption, this.textKey)
        : this.placeholder || t('select');

      return (
        <Tab
          title={title}
          titleClass={bem('tab', {
            unselected: !selectedOption,
          })}
        >
          {this.renderOptions(options, selectedOption, tabIndex)}
        </Tab>
      );
    },

    renderTabs() {
      return (
        <Tabs
          vModel={this.activeTab}
          animated
          swipeable
          swipeThreshold={0}
          class={bem('tabs')}
          color={this.activeColor}
        >
          {this.tabs.map(this.renderTab)}
        </Tabs>
      );
    },
  },

  render() {
    return (
      <div class={bem('wrapppcascader')}>
        <Field
          label={this.labelField}
          value={this.getTitle()}
          readonly
          isLink={false}
          input-align={this.inputAlign || "right"}
          onClick={this.togglePopup}
          notitle={true}
          notitleblock={this.notitleblock}
          novalue={this.novalue}
          insel={true}
        />
        <Popup
          safe-area-inset-bottom
          round
          ref="popforcas"
          class={bem('popup')}
          position={'bottom'}
          closeOnClickOverlay={this.closeOnClickOverlay}
          // onClickOverlay={this.togglePopup}
        >
          <div class={bem()}>
            {this.renderHeader()}
            {this.renderTabs()}
          </div>
        </Popup>
      </div>
    );
  },
});
