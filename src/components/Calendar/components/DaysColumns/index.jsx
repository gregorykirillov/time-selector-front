import { useState } from 'react';
import cn from 'classnames';
import { observer } from 'mobx-react-lite';

import dates from '@/store/dates';
import TimeSlot from '../TimeSlot';
import {
    handleMouseDown,
    handleMouseEnter,
    isWeekend,
    isLocked,
    template,
    isToday,
    isPast,
} from '../../helpers';

import styles from './styles.scss';

const DaysColumns = observer(({ startWeekDay, busy, free }) => {
    const TOTAL_DAYS = 7;

    const [mouseSelecting, setMouseSelecting] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const handleMouseUp = () => {
        if (mouseSelecting) setMouseSelecting(false);
        if (isDeleting) setDeleting(false);
    };

    const d = startWeekDay.clone().subtract(1, 'day');
    const daysArray = [...Array(TOTAL_DAYS)].map(() => d.add(1, 'day').clone());
    const HOURS = 24;

    return (
        <>
            {daysArray.map((datetime, ind) => {
                const props = (e) => ({
                    setMouseSelecting,
                    mouseSelecting,
                    isDeleting,
                    setDeleting,
                    datetime,
                    template,
                    dates,
                    e,
                });

                return (
                    <div
                        className={cn(
                            styles.dayBlock,
                            'dayBlock',
                            isWeekend(datetime) ? styles.weekend : '',
                        )}
                        onMouseDown={(e) => handleMouseDown(props(e))}
                        onMouseUp={() => handleMouseUp()}
                        onMouseMove={(e) => handleMouseEnter(props(e))}
                        key={`${datetime}_${ind}`}
                    >
                        <div
                            className={cn(
                                styles.dayWrapper,
                                isPast(datetime.endOf('day')) ||
                                    isLocked(datetime, busy)
                                    ? styles.blocked
                                    : '',
                                'dayWrapper',
                            )}
                        >
                            <div
                                className={
                                    isToday(datetime)
                                        ? styles.currentDay
                                        : styles.dayNum
                                }
                            >
                                {datetime.date()}
                            </div>
                        </div>
                        <div className={cn(styles.timeRows, 'timeRows')}>
                            {Array(HOURS)
                                .fill(0)
                                .map((num, hour) => {
                                    const quarterHour = 0;

                                    return (
                                        <div
                                            key={`${hour}`}
                                            className={
                                                isPast(
                                                    datetime.set('hours', hour),
                                                ) ||
                                                isLocked(
                                                    datetime
                                                        .set('hours', hour)
                                                        .set('minutes', 0),
                                                    busy,
                                                    free,
                                                )
                                                    ? styles.blocked
                                                    : ''
                                            }
                                        >
                                            <TimeSlot
                                                datetime={datetime}
                                                hour={hour}
                                                quarterHour={quarterHour}
                                            />
                                            <TimeSlot
                                                datetime={datetime}
                                                hour={hour}
                                                quarterHour={quarterHour + 2}
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                );
            })}
        </>
    );
});

export default DaysColumns;
