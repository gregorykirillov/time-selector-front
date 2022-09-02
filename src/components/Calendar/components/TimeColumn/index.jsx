import cn from 'classnames';

import { timesArray } from './timesArray';

import styles from './styles.scss';

const TimeColumn = () => {
    const HOURS = 24;

    return (
        <div className={cn(styles.timeBlock, 'timeBlock')}>
            <div className={styles.timeWrapper}></div>
            <div className={styles.timeRows}>
                {Array(HOURS)
                    .fill(0)
                    .map((_, i) => {
                        return (
                            <div key={i} className={styles.timeSlot}>
                                {timesArray[i]}
                            </div>
                        );
                    })}
            </div>
        </div>
    );
};

export default TimeColumn;
