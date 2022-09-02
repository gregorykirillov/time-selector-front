import { useNavigate } from 'react-router-dom';

export const useHandlers = ({ index, setIndex, dates }) => {
    const navigate = useNavigate();

    const handlePrevClick = () => {
        setIndex(index - 1);
    };

    const handleAddClick = () => {
        const nextInd = index + 1;
        setIndex(nextInd);
        dates.addNextDate(nextInd);
    };

    const handleNextClick = () => navigate('/options');

    const getBusy = (arr) => {
        const array = arr.slice(0, index);
        const busy = array.concat(...array);

        return busy;
    };

    return { handlePrevClick, handleAddClick, handleNextClick, getBusy };
};
