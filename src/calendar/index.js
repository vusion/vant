// Utils
import dayjs from '../utils/dayjs';
import { raf } from '../utils/dom/raf';
import { isDate } from '../utils/validate/date';
import { isNaN } from '../utils/validate/number';
import { getScrollTop } from '../utils/dom/scroll';
import {
  transErrorDate,
  transErrorMinOrMaxDate,
  t,
  bem,
  copyDate,
  copyDates,
  getNextDay,
  compareDay,
  calcDateNum,
  compareMonth,
  createComponent,
  getDayByOffset,
} from './utils'

// Components
import Popup from '../popup';
import Button from '../button';
import Toast from '../toast';
import Month from './components/Month';
import Header from './components/Header';
import Field from '../field';

import { FieldMixin } from '../mixins/field';

export default createComponent({
  mixins: [FieldMixin],

  props: {
    title: String,
    color: String,
    readonly: Boolean,
    disabled: Boolean,
    formatter: Function,
    rowHeight: [Number, String],
    confirmText: String,
    rangePrompt: String,
    labelField: {
      type: String,
      default: '',
    },
    // 废弃
    defaultDate: {
      type: [Date, Array, String],
      default: null,
    },
    value: {
      type: [Date, Array, String],
      default: null,
    },
    getContainer: [String, Function],
    allowSameDay: Boolean,
    confirmDisabledText: String,
    type: {
      type: String,
      default: 'single',
    },
    round: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'bottom',
    },
    poppable: {
      type: Boolean,
      default: true,
    },
    maxRange: {
      type: [Number, String],
      default: null,
    },
    lazyRender: {
      type: Boolean,
      default: false, // ???
    },
    showMark: {
      type: Boolean,
      default: true,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showSubtitle: {
      type: Boolean,
      default: true,
    },
    closeOnPopstate: {
      type: Boolean,
      default: true,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: false,
    },
    safeAreaInsetBottom: {
      type: Boolean,
      default: true,
    },
    minDate: {
      type: Date,
      validator: isDate,
      default: () => {
        const now = new Date();
        return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
      },
    },
    maxDate: {
      type: Date,
      validator: isDate,
      default() {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth() + 12, now.getDate());
      },
    },
    firstDayOfWeek: {
      type: [Number, String],
      default: 0,
      validator: (val) => val >= 0 && val <= 6,
    },
    inputAlign: String,
  },

  data() {
    const currentValue = this.value ?? this.defaultDate;

    return {
      currentValue,
      tempValue: currentValue,

      subtitle: '',
      popupShown: false,
      defaultMonthForSelect: null,
    };
  },

  computed: {
    currentDate() {
      return this.getInitialDate(this.tempValue);
    },

    months() {
      const months = [];
      const cursor = transErrorMinOrMaxDate(this.minDate, 'min');

      cursor.setDate(1);
      do {
        months.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while (compareMonth(cursor, transErrorMinOrMaxDate(this.maxDate, 'max')) !== 1);

      return months;
    },

    buttonDisabled() {
      const { currentDate } = this;

      return !currentDate;
    },

    dayOffset() {
      return this.firstDayOfWeek ? this.firstDayOfWeek % 7 : 0;
    },

    defaultMonthForSelectCom() {
      return this.defaultMonthForSelect;
    },
  },

  watch: {
    popupShown: 'init',

    type() {
      this.reset();
    },
    currentValue(val) {
      this.tempValue = val;

      const date = dayjs(val)
      this.$emit('update:value', date.isValid() ? date.format('YYYY-MM-DD') : val);
      this.$emit('update:default-date', date.isValid() ? date.format('YYYY-MM-DD') : val);
    },
    defaultDate: {
      handler(val) {
        this.currentValue = val;
        this.scrollIntoView();
      },
      immediate: true,
    },

    value: {
      handler(val) {
        this.currentValue = val;
        this.scrollIntoView();
      },
      immediate: true,
    },
  },

  mounted() {
    this.init();
  },

  /* istanbul ignore next */
  activated() {
    this.init();
  },

  methods: {
    getTitle() {
      if (this.ifDesigner()) {
        return this.value ?? this.defaultDate;
      }

      const controledValue = this.value ?? this.defaultDate;
      if (controledValue && dayjs(controledValue).isValid()) {
        console.log(11);
        return dayjs(controledValue).format('YYYY-MM-DD')
      }

      if (this.currentValue && dayjs(this.currentValue).isValid()) {
        return dayjs(this.currentValue).format('YYYY-MM-DD')
      }

      return '';
    },
    setCurrentDate(date) {
      this.currentValue = date;
    },
    ifDesigner() {
      return this.$env && this.$env.VUE_APP_DESIGNER;
    },
    togglePopup() {
      if (this.readonly || this.disabled) {
        return;
      }

      if (this.poppable) {
        this.popupShown = !this.popupShown;
      }
    },
    // @exposed-api
    reset(date = this.getInitialDate()) {
      this.currentValue = date;
      this.scrollIntoView();
    },

    init() {
      if (this.poppable && !this.popupShown) {
        return;
      }

      this.$nextTick(() => {
        // add Math.floor to avoid decimal height issues
        // https://github.com/youzan/vant/issues/5640
        this.bodyHeight = Math.floor(
          this.$refs.body.getBoundingClientRect().height
        );
        this.onScroll();
        this.scrollIntoView();
      });
    },

    // @exposed-api
    scrollToDate(targetDate) {
      raf(() => {
        const displayed = this.popupShown || !this.poppable;

        /* istanbul ignore if */
        if (!targetDate || !displayed) {
          return;
        }

        this.months.some((month, index) => {
          if (compareMonth(month, targetDate) === 0) {
            const { body, months } = this.$refs;
            months[index].scrollIntoView(body);
            return true;
          }

          return false;
        });

        this.onScroll();
      });
    },

    // scroll to current month
    scrollIntoView() {
      const { currentDate } = this;

      if (currentDate) {
        const targetDate = currentDate;
        this.scrollToDate(targetDate);
      }
    },

    getInitialDate(val) {
      const { minDate, maxDate, value, defaultDate } = this;
      val = val || (value ?? defaultDate);

      let defaultVal = new Date();
      const min = transErrorMinOrMaxDate(minDate, 'min');
      const max = transErrorMinOrMaxDate(maxDate, 'max');
      if (compareDay(defaultVal, min) === -1) {
        defaultVal = min;
      } else if (compareDay(defaultVal, max) === 1) {
        defaultVal = max;
      }

      if (val) {
        return dayjs(val).toDate();
      }

      return dayjs(defaultVal).toDate();
    },

    // calculate the position of the elements
    // and find the elements that needs to be rendered
    onScroll() {
      const { body, months } = this.$refs;
      const top = getScrollTop(body);
      const bottom = top + this.bodyHeight;
      const heights = months.map((item) => item.getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);

      // iOS scroll bounce may exceed the range
      if (bottom > heightSum && top > 0) {
        return;
      }

      let height = 0;
      let currentMonth;
      const visibleRange = [-1, -1];

      for (let i = 0; i < months.length; i++) {
        const visible = height <= bottom && height + heights[i] >= top;

        if (visible) {
          visibleRange[1] = i;

          if (!currentMonth) {
            currentMonth = months[i];
            visibleRange[0] = i;
          }

          if (!months[i].showed) {
            months[i].showed = true;
            this.$emit('month-show', {
              date: months[i].date,
              title: months[i].title,
            });
          }
        }

        height += heights[i];
      }

      months.forEach((month, index) => {
        month.visible =
          index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
      });

      /* istanbul ignore else */
      if (currentMonth) {
        this.defaultMonthForSelect = currentMonth.getDate;
        this.subtitle = currentMonth.title;
      }
    },

    onClickDay(item) {
      if (this.readonly || this.disabled) {
        return;
      }

      const { date } = item;

      this.tempValue = date;
      this.$emit('select', dayjs(date).toDate());

      if (!this.showConfirm) {
        this.onConfirm();
      }
    },

    onConfirm() {
      this.currentValue = this.currentDate;
      this.$emit('confirm', dayjs(this.currentValue).format('YYYY-MM-DD'));

      this.togglePopup();
    },

    genMonth(date, index) {
      const showMonthTitle = index !== 0 || !this.showSubtitle;
      return (
        <Month
          ref="months"
          refInFor
          date={date}
          type={this.type}
          disabled={this.disabled}
          color={this.color}
          minDate={transErrorMinOrMaxDate(this.minDate, 'min')}
          maxDate={transErrorMinOrMaxDate(this.maxDate, 'max')}
          showMark={this.showMark}
          formatter={this.formatter}
          rowHeight={this.rowHeight}
          lazyRender={this.lazyRender}
          currentDate={this.currentDate}
          showSubtitle={this.showSubtitle}
          allowSameDay={this.allowSameDay}
          showMonthTitle={showMonthTitle}
          firstDayOfWeek={this.dayOffset}
          scopedSlots={{
            'top-info': this.$scopedSlots['top-info'],
            'bottom-info': this.$scopedSlots['bottom-info'],
          }}
          onClick={this.onClickDay}
        />
      );
    },

    genFooterContent() {
      const slot = this.slots('footer');

      if (slot) {
        return slot;
      }

      if (this.showConfirm) {
        const text = this.buttonDisabled
          ? this.confirmDisabledText
          : this.confirmText;

        return (
          <Button
            round
            block="blockb"
            type="info"
            color={this.color}
            class={bem('confirm')}
            disabled={this.buttonDisabled}
            nativeType="button"
            onClick={this.onConfirm}
          >
            {text || t('confirm')}
          </Button>
        );
      }
    },

    genFooter() {
      return (
        <div class={bem('footer', { unfit: !this.safeAreaInsetBottom })}>
          {this.genFooterContent()}
        </div>
      );
    },

    genCalendar() {
      return (
        <div class={bem()}>
          <Header
            title={this.title}
            showTitle={this.showTitle}
            subtitle={this.subtitle}
            showSubtitle={this.showSubtitle}
            currentDate={this.currentDate}
            defaultMonthForSelect={this.defaultMonthForSelectCom}
            scopedSlots={{
              title: () => this.slots('title'),
            }}
            firstDayOfWeek={this.dayOffset}
            setCurrentDate={this.setCurrentDate}
            minDate={this.minDate}
            maxDate={this.maxDate}
            scrollToDate={this.scrollToDate}
          />
          <div ref="body" class={bem('body')} onScroll={this.onScroll}>
            {this.months.map(this.genMonth)}
          </div>
          {this.genFooter()}
        </div>
      );
    },
  },

  render() {
    const tempSlot = {
      title: () => this.slots('title'),
    };
    if (this.poppable) {
      return (
        <div class={bem('wrapppcalendar')}>
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
            nofi={true}
          />
          <Popup
            safe-area-inset-bottom
            class={bem('popup')}
            value={this.popupShown}
            round={this.round}
            position={this.position}
            ref="popforcas"
            get-container="body" // 放body下不易出现异常情况
            closeOnClickOverlay={this.closeOnClickOverlay}
          >
            {this.genCalendar()}
          </Popup>
        </div>
      );
    }

    return this.genCalendar();
  },
});
