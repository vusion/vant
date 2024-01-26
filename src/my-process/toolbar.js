import { createNamespace } from '../utils';
import dayjs from '../utils/dayjs';
import Row from '../row';
import Col from '../col';
import Iconv from '../iconv';

import DateTimePicker from '../datetime-picker';
import Picker from '../pickerson';

import mockData from './mock.json';

const [createComponent, bem, t] = createNamespace('my-process-toolbar');

export default createComponent({
  props: {
    tab: String,
  },

  data() {
    return {
      allProcess: [],
      allInitiator: [],

      processPopupValue: false,
      initiatorPopupValue: false,
      startTimePopupValue: false,
    };
  },

  methods: {
    showProcessPicker() {
      this.getAllProcess().then((data) => {
        this.allProcess = data;
        this.$refs.processPicker.togglePopup();
      });
    },

    showInitiatorPicker() {
      this.getAllInitiator().then((data) => {
        this.allInitiator = data.map(({ userName }) => ({
          text: userName,
          value: userName,
        }));
        this.$refs.initiatorPicker.togglePopup();
      });
    },

    async getAllProcess() {
      let result;
      if (this.$processV2) {
        const { data } = await this.$processV2.getProcessDefinitionList();
        result = data;
      } else {
        result = mockData.allProcess;
      }

      return result;
    },

    async getAllInitiator() {
      let result;
      if (this.$processV2) {
        const { data } = await this.$processV2.getProcessStartByList();
        result = data;
      } else {
        result = mockData.allInitiator;
      }

      return result;
    },

    onProcessPickerChange(value) {
      this.$emit('change', {
        processDefUniqueKey: value,
      }, this.tab);
    },

    onInitiatorPickerChange(value) {
      this.$emit('change', {
        startBy: value,
      }, this.tab);
    },

    onStartTimePickerChange(value) {
      const { start, end } = value;
      this.$emit('change', {
        createTimeAfter: dayjs(`${start} 00:00:00`).toISOString(),
        createTimeBefore: dayjs(`${end} 23:59:59`).toISOString(),
      }, this.tab);
    },
  },

  render() {
    return (
      <div>
        <Row class={bem()} align="center">
          <Col span={8}>
            <div class={bem('button')} onClick={this.showProcessPicker}>
              {t('process')}
              <Iconv
                class={bem('button-icon')}
                name="bottom-triangle"
                size={12}
              ></Iconv>
            </div>
          </Col>

          {this.tab !== 'myLaunchList' ? (
            <Col span={8}>
              <div class={bem('button')} onClick={this.showInitiatorPicker}>
                {t('initiator')}
                <Iconv
                  class={bem('button-icon')}
                  name="bottom-triangle"
                  size={12}
                ></Iconv>
              </div>
            </Col>
          ) : null}

          <Col span={8}>
            <div
              class={bem('button')}
              onClick={() => {
                this.$refs.datePicker.open();
              }}
            >
              {t('startTime')}
              <Iconv
                class={bem('button-icon')}
                name="bottom-triangle"
                size={12}
              ></Iconv>
            </div>
          </Col>
        </Row>
        {/* 选择器--流程 */}
        <Picker
          vShow={false}
          ref="processPicker"
          dataSource={[
            { processDefUniqueKey: null, title: '全部' },
            ...this.allProcess,
          ]}
          valueField="processDefUniqueKey"
          textField="title"
          onConfirm={this.onProcessPickerChange}
          showToolbar
          title={t('process')}
          closeOnClickOverlay
        />
        {/* 选择器--发起人 */}
        <Picker
          vShow={false}
          ref="initiatorPicker"
          dataSource={[{ text: '全部', value: null }, ...this.allInitiator]}
          valueField="value"
          textField="text"
          onConfirm={this.onInitiatorPickerChange}
          showToolbar
          title={t('initiator')}
          closeOnClickOverlay
        />
        {/* 选择器--时间 */}
        <DateTimePicker
          vShow={false}
          ref="datePicker"
          range
          type="date"
          unit="date"
          onConfirm={this.onStartTimePickerChange}
          title={t('startTime')}
          closeOnClickOverlay
        />
      </div>
    );
  },
});
