import cn from 'classnames';

import { isSelected, template } from '../../helpers';
import { prepareSlotToDate } from '../../helpers/mouseHandlers';
import dates from '@/store/dates';

import styles from '../DaysColumns/styles.scss';

const TimeSlot = ({ datetime, hour, quarterHour }) => {
    const getDate = (ind) =>
        prepareSlotToDate({
            datetime,
            ind,
        });

    return (
        <div className={styles.timeSlot}>
            <div
                className={cn(
                    styles.row,
                    'row',
                    isSelected(
                        dates.get(),
                        template(getDate(`${hour}_${quarterHour}`)),
                    )
                        ? styles.selected
                        : '',
                )}
                data-ind={`${hour}_${quarterHour++}`}
            ></div>
            <div
                className={cn(
                    styles.row,
                    'row',
                    isSelected(
                        dates.get(),
                        template(getDate(`${hour}_${quarterHour}`)),
                    )
                        ? styles.selected
                        : '',
                )}
                data-ind={`${hour}_${quarterHour++}`}
            ></div>
        </div>
    );
};

export default TimeSlot;
