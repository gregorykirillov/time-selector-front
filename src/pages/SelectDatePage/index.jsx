import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

import dates from '@/store/dates';
import { Calendar } from '@/components';
import { useHandlers } from './useHandlers';
import { Button } from '@/uikit';

import styles from './styles.scss';

const SelectDatePage = observer(() => {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        dates.clearDates();
    }, []);

    const { getBusy } = useHandlers({ index, setIndex, dates });
    const navigate = useNavigate();
    const handleClick = () => navigate('/options');

    return (
        <>
            <h2 className={styles.text}>Выберите промежуток</h2>
            <Calendar busy={getBusy(dates.get())} />
            <Button onClick={handleClick}>Далее</Button>
        </>
    );
});

export default SelectDatePage;
