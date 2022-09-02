import moment from 'moment';

export const template = (day) => day.format('DD.MM.YY HH:mm');

export const isWeekend = (day) => day.day() === 0 || day.day() === 6;

export const isToday = (day) => moment().subtract(1, 'month').isSame(day, 'day');

export const isPast = (day) => {
    return moment().subtract(1, 'month').isAfter(day);
};

export const isLocked = (day, busy = [], free = []) => {
    if (busy.length !== 0) {
        return busy.includes(template(day));
    } else if (free.length !== 0) {
        return !free.some((el) => el.includes(template(day).slice(0, 11)));
    }
    return false;
};
