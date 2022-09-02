import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { Calendar } from '@/components';
import dates from '@/store/dates';
import { useHandlers } from '../SelectDatePage/useHandlers';
import { Preloader } from '@/uikit';

const SurveyPage = observer(() => {
    const [data, setData] = useState([]);
    const { link } = useParams();

    const [index, setIndex] = useState(0);
    const { getBusy } = useHandlers({ index, setIndex, dates });

    useEffect(() => {
        dates.loadDates(link).then((res) => setData(res));
    }, []);

    dates.isLoading && <Preloader />;

    return <Calendar free={data} busy={getBusy(dates.get())} />;
});

export default SurveyPage;
