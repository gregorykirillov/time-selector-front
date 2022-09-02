import { useNavigate } from 'react-router-dom';

import { LoginButton } from './components';
import { Button } from '@/uikit';

import styles from './styles.scss';

const Header = () => {
    const navigate = useNavigate();
    const handleClickCreate = () => navigate('/create');

    return (
        <header className={styles.header}>
            <div className={styles.leftSide}>
                <button
                    className={styles.titleButton}
                    onClick={() => navigate('/')}
                >
                    <img height="36px" width="36px" src="/icons/logo.svg" />
                    <p className={styles.titleText}>Time Selector</p>
                </button>
            </div>
            <div className={styles.rightSide}>
                <Button className={styles.button} onClick={handleClickCreate}>
                    Создать опрос
                </Button>
                <LoginButton />
            </div>
        </header>
    );
};

export default Header;
