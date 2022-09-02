import { useNavigate } from 'react-router';

import user from '@/store/user';
import { Button } from '@/uikit';

import styles from './styles.scss';

const LoginForm = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        await user.logout();

        if (!user.isAuth) {
            navigate('/');
        }
    };

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <p>{user.user.email}</p>
            <p>
                Почта{' '}
                {user.user.isActivated ? 'подтверждена' : 'не подтверждена'}
            </p>
            <Button onClick={handleLogout}>Выход</Button>
        </form>
    );
};

export default LoginForm;
