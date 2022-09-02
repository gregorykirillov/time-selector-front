import { observer } from 'mobx-react-lite';

import { DaysColumns, TimeColumn } from '../../components';

import styles from './styles.scss';

const CalendarGrid = observer(({ startWeekDay, busy, free }) => {
    return (
        <div className={styles.gridWrapper}>
            <TimeColumn />
            <DaysColumns startWeekDay={startWeekDay} busy={busy} free={free} />
        </div>
    );
});

export default CalendarGrid;
