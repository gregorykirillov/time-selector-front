import { useMemo, useState } from 'react';
import moment from 'moment';

import { CalendarGrid, Title, Monitor } from './components';

import styles from './styles.scss';

const Calendar = ({ busy = [], free = [] }) => {
    const [startDate, setStartDate] = useState(() => moment().subtract(1, 'month').clone());
    const startWeekDay = useMemo(
        () => startDate.clone().startOf('isoWeek'),
        [startDate],
    );

    return (
        <div className={styles.calendarWrapper}>
            <Title />
            <Monitor startDate={startDate} setStartDate={setStartDate} />
            <CalendarGrid startWeekDay={startWeekDay} busy={busy} free={free} />
        </div>
    );
};
export default Calendar;
