import moment from 'moment';

import styles from './styles.scss';

const Monitor = ({ startDate, setStartDate }) => {
    return (
        <div className={styles.divWrapper}>
            <div className={styles.dateWrapper}>
                <div>
                    <strong>{startDate.format('MMMM')}</strong>
                </div>
                <div>{startDate.format('YYYY')}</div>
            </div>
            <div className={styles.controlsWrapper}>
                <button
                    disabled={moment().subtract(1, 'month').isAfter(startDate)}
                    onClick={() =>
                        setStartDate(startDate.subtract(1, 'week').clone())
                    }
                >
                    {' < '}
                </button>
                <button
                    className={styles.today}
                    onClick={() =>
                        setStartDate(moment().subtract(1, 'month').startOf('isoWeek').clone())
                    }
                >
                    Today
                </button>
                <button
                    onClick={() =>
                        setStartDate(startDate.add(1, 'week').clone())
                    }
                >
                    {' > '}
                </button>
            </div>
        </div>
    );
};

export default Monitor;
