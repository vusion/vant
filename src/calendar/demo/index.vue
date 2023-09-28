<template>
  <demo-section>
    <demo-block>
      <div>date: {{ date }}</div>
      <div>start: {{ start }}</div>
      <div>end: {{ end }}</div>
      <van-calendar
        label-field="日历选择"
        :value.sync="start"
        :min-date="min"
        :max-date="end"
        title="选择日期"
      ></van-calendar>
      <van-calendar
        label-field="日历选择"
        :value.sync="end"
        :min-date="start"
        :max-date="max"
        title="选择日期"
      ></van-calendar>
      <button @click="clear">clear</button>
    </demo-block>

    <demo-block title="全量渲染节点">
      <van-calendar
        label-field="日历选择"
        :value.sync="start"
        :min-date="min"
        :max-date="end"
        title="选择日期"
        :lazyRender="false"
      ></van-calendar>
    </demo-block>
  </demo-section>
</template>

<script>
export default {
  i18n: {
    'zh-CN': {
      in: '入店',
      out: '离店',
      today: '今天',
      laborDay: '劳动节',
      youthDay: '青年节',
      calendar: '日历',
      maxRange: '日期区间最大范围',
      selectCount: (count) => `选择了 ${count} 个日期`,
      selectSingle: '选择单个日期',
      selectMultiple: '选择多个日期',
      selectRange: '选择日期区间',
      quickSelect: '快捷选择',
      confirmText: '完成',
      customColor: '自定义颜色',
      customRange: '自定义日期范围',
      customConfirm: '自定义按钮文字',
      customDayText: '自定义日期文案',
      customPosition: '自定义弹出位置',
      customCalendar: '自定义日历',
      confirmDisabledText: '请选择结束时间',
      firstDayOfWeek: '自定义周起始日',
      tiledDisplay: '平铺展示',
    },
    'en-US': {
      in: 'In',
      out: 'Out',
      today: 'Today',
      laborDay: 'Labor day',
      youthDay: 'Youth Day',
      calendar: 'Calendar',
      maxRange: 'Max Range',
      selectCount: (count) => `${count} dates selected`,
      selectSingle: 'Select Single Date',
      selectMultiple: 'Select Multiple Date',
      selectRange: 'Select Date Range',
      quickSelect: 'Quick Select',
      confirmText: 'OK',
      customColor: 'Custom Color',
      customRange: 'Custom Date Range',
      customConfirm: 'Custom Confirm Text',
      customDayText: 'Custom Day Text',
      customPosition: 'Custom Position',
      customCalendar: 'Custom Calendar',
      firstDayOfWeek: 'Custom First Day Of Week',
      confirmDisabledText: 'Select End Time',
      tiledDisplay: 'Tiled display',
    },
  },

  data() {
    return {
      date: '2023-10-11',
      start: null,
      end: null,
      min: '1900-01-01',
      max: '2050-12-31',
    };
  },

  methods: {
    resetSettings() {
      this.round = true;
      this.color = undefined;
      this.minDate = undefined;
      this.maxDate = undefined;
      this.maxRange = undefined;
      this.position = undefined;
      this.formatter = undefined;
      this.showConfirm = true;
      this.confirmText = undefined;
      this.confirmDisabledText = undefined;
      this.firstDayOfWeek = 0;
    },

    show(type, id) {
      this.resetSettings();
      this.id = id;
      this.type = type;
      this.showCalendar = true;

      switch (id) {
        case 'quickSelect1':
        case 'quickSelect2':
          this.showConfirm = false;
          break;
        case 'customColor':
          this.color = '#1989fa';
          break;
        case 'customConfirm':
          this.confirmText = this.t('confirmText');
          this.confirmDisabledText = this.t('confirmDisabledText');
          break;
        case 'customRange':
          this.minDate = new Date(2010, 0, 1);
          this.maxDate = new Date(2010, 0, 31);
          break;
        case 'customDayText':
          this.minDate = new Date(2010, 4, 1);
          this.maxDate = new Date(2010, 4, 31);
          this.formatter = this.dayFormatter;
          break;
        case 'customPosition':
          this.round = false;
          this.position = 'right';
          break;
        case 'maxRange':
          this.maxRange = 3;
          break;
        case 'firstDayOfWeek':
          this.firstDayOfWeek = 1;
          break;
      }
    },

    dayFormatter(day) {
      const month = day.date.getMonth() + 1;
      const date = day.date.getDate();

      if (month === 5) {
        if (date === 1) {
          day.topInfo = this.t('laborDay');
        } else if (date === 4) {
          day.topInfo = this.t('youthDay');
        } else if (date === 11) {
          day.text = this.t('today');
        }
      }

      if (day.type === 'start') {
        day.bottomInfo = this.t('in');
      } else if (day.type === 'end') {
        day.bottomInfo = this.t('out');
      }

      return day;
    },

    formatDate(date) {
      if (date) {
        return `${date.getMonth() + 1}/${date.getDate()}`;
      }
    },

    formatFullDate(date) {
      if (date) {
        return `${date.getFullYear()}/${this.formatDate(date)}`;
      }
    },

    formatMultiple(dates) {
      if (dates.length) {
        return this.t('selectCount', dates.length);
      }
    },

    formatRange(dateRange) {
      if (dateRange.length) {
        const [start, end] = dateRange;
        return `${this.formatDate(start)} - ${this.formatDate(end)}`;
      }
    },

    onConfirm(date) {
      this.showCalendar = false;
      this.date[this.id] = date;
    },
    clear() {
      this.date = null
      this.start = null
      this.end = null
    }
  },
};
</script>
