import { useNavigate } from 'react-router';

export const useHandlers = (dates) => {
    const navigate = useNavigate();

    const handlePrevClick = () => navigate('/create');

    const handleData = (dates) => {
        const [pickedDates] = [dates.get()];
        const formattedDates = {};

        pickedDates.map((el) => {
            const [date, time] = el.split(' ');

            formattedDates[date]
                ? formattedDates[date].push(time)
                : (formattedDates[date] = [time]);
        });

        return formattedDates;
    };

    return { data: handleData(dates), handlePrevClick };
};
