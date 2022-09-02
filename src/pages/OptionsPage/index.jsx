import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router';

import dates from '@/store/dates';
import user from '@/store/user';
import { useHandlers } from './useHandlers';
import { Button } from '@/uikit';

import styles from './styles.scss';

const OptionsPage = observer(() => {
    const { data, handlePrevClick } = useHandlers(dates);
    const navigate = useNavigate();

    const handleNextClick = async () => {
        const hash = await user.createSurvey(data);
        navigate('/result', { state: { hash } });
    };

    return (
        <div className={styles.contentBlock}>
            <h2>You have selected:</h2>
            {Object.keys(data).map((key) => {
                return (
                    <div key={`${key}_${data[key]}`}>
                        {key}:
                        {data[key]
                            .sort((a, b) => a - b)
                            .map((time) => (
                                <p key={time}>{time}</p>
                            ))}
                    </div>
                );
            })}
            <Button onClick={handlePrevClick}>Назад</Button>
            <Button onClick={handleNextClick}>Создать</Button>
        </div>
    );
});

export default OptionsPage;
