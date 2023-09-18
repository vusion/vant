import dayjs from 'dayjs/esm/index';
import isoWeek from 'dayjs/esm/plugin/isoWeek';
import isoWeeksInYear from 'dayjs/esm/plugin/isoWeeksInYear';
import isLeapYear from 'dayjs/esm/plugin/isLeapYear';
import advancedFormat from './plugin/advancedFormat';
import customParseFormat from './plugin/customParseFormat';

dayjs.extend(isoWeeksInYear);
dayjs.extend(isLeapYear);
dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(customParseFormat);

export default dayjs;
