<template>
  <demo-section>
    <demo-block card title="受控联动绑定">
      <div>value: {{ date }}</div>
      <van-datetime-picker
        :isNew="false"
        :ref="`datetime_picker1`"
        type="date"
        title="选择完整时间"
        input-align="left"
        :value.sync="date"
        :startValue.sync="startValue"
        :endValue.sync="endValue"
        :range="true">
          <template #top-cancel>
            <van-iconv name="left-arrow" icotype="only"> </van-iconv>
          </template>
          <template #title>
            <van-text text="顶部标题"></van-text>
          </template>
          <template #bottom-cancel>
            <van-button
              type="info_secondary"
              size="normal"
              text="取消"
              squareroud="round"
            ></van-button>
          </template>
          <template #bottom-confirm>
            <van-button
              type="info"
              size="normal"
              text="确认"
              squareroud="round"
            ></van-button>
          </template>
      </van-datetime-picker>
      <van-datetime-picker :ref="`datetime_picker2`" type="datetime" title="选择完整时间" input-align="left" :value.sync="variable1">
            <template #title>
                <van-text :ref="`text2`" text="标题"></van-text>
          </template>
      </van-datetime-picker>

      <van-button @click="clear">clear</van-button>
    </demo-block>

    <demo-block card :title="t('yearMonthType')">
      <van-datetime-picker
        :value.sync="value.yearMonth"
        type="year-month"
        :title="t('yearMonthType')"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </demo-block>
    <demo-block card :title="t('timeType')">
      <van-datetime-picker
        :value.sync="value.time"
        type="time"
        :title="t('timeType')"
        :min-hour="10"
        :max-hour="20"
      />
    </demo-block>
    <demo-block card :title="t('dateType')">
      <van-datetime-picker
        :value.sync="value.date"
        type="date"
        :title="t('dateType')"
      />
    </demo-block>
    <demo-block card :title="t('datetimeType')">
      <van-datetime-picker
        :value.sync="value.datetime"
        type="datetime"
        :title="t('datetimeType')"
      />
    </demo-block>
    <demo-block card :title="t('datetimeType')">
      <van-datetime-picker
        :value.sync="value.datetime"
        type="datetime"
        :title="t('datetimeType')"

        :max-date="maxDate"
      />
    </demo-block>

  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      day: '日',
      year: '年',
      month: '月',
      timeType: '选择时间',
      dateType: '选择年月日',
      datetimeType: '选择完整时间',
      datehourType: '选择年月日小时',
      monthDayType: '选择月日',
      yearMonthType: '选择年月',
      optionFilter: '选项过滤器',
      sortColumns: '自定义列排序',
    },
    'en-US': {
      day: ' Day',
      year: ' Year',
      month: ' Month',
      timeType: 'Choose Time',
      dateType: 'Choose Date',
      datetimeType: 'Choose DateTime',
      datehourType: 'Choose DateHour',
      monthDayType: 'Choose Month-Day',
      yearMonthType: 'Choose Year-Month',
      optionFilter: 'Option Filter',
      sortColumns: 'Columns Order',
    },
  },

  data() {
    return {
      variable1: undefined,

      minDate: new Date(2020, 0, 1),
      maxDate: "2020-12-12 12:12:12" || new Date(2025, 10, 1),
      date: "2021-01-13 00:00:00" || new Date(2021, 0, 17),
      startValue: undefined,
      endValue: new Date(2024, 1, 1),
      value: {
        date: "2021-01-13 00:00:00" || new Date(2021, 0, 17),
        time: '12:00',
        datetime: '2022-03-31T07:21:52.066Z',
        datehour: new Date(2020, 0, 1),
        monthDay: new Date(2020, 0, 1),
        // yearMonth: new Date(2020, 0, 1),
        yearMonth: '2020-08',
        optionFilter: '12:00',
        sortColumnsDate: new Date(2020, 0, 1),
      },
    };
  },

  methods: {
    formatter(type, value) {
      if (type === 'year') {
        return value + this.t('year');
      }
      if (type === 'month') {
        return value + this.t('month');
      }
      if (type === 'day') {
        return value + this.t('day');
      }
      return value;
    },

    filter(type, values) {
      if (type === 'minute') {
        return values.filter((value) => value % 5 === 0);
      }

      return values;
    },
    changeDate() {
      this.date = '2023-09-01'
    },
    clear() {
      this.date = null
    }
  },
};
</script>
