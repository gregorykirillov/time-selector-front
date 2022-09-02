import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import user from '@/store/user';

import styles from './styles.scss';

const LoginButton = observer(() => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <button className={styles.loginButton} onClick={handleLogin}>
            <img
                src="/icons/login.svg"
                height="36px"
                width="36px"
                alt="login"
            />
            {!user.isLoading && <span>{user.getUserInfo().firstName}</span>}
        </button>
    );
});

export default LoginButton;
