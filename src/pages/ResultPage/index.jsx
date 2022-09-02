import { useLocation } from 'react-router';

import { CLIENT_URL } from '@/settings';

const ResultPage = () => {
    const {
        state: { hash },
    } = useLocation();
    const link = `${CLIENT_URL}/survey/${hash}`;

    return (
        <div>
            <h2>Your link:</h2>
            <a href={link}>{link}</a>
        </div>
    );
};

export default ResultPage;
