import { useState } from 'react';

import user from '@/store/user';
import { Button } from '@/uikit';
import { FormInput } from './components';

import styles from './styles.scss';

const LoginForm = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistration, setRegistration] = useState(false);

    const filledValues = (...args) =>
        args.length === args.filter((el) => el !== '').length;

    const handleLogin = async () => {
        setRegistration(false);

        if (filledValues(email, password)) {
            await user.login(email, password);
        }
    };

    const handleRegister = async () => {
        if (isRegistration) {
            if (filledValues(firstName, lastName, email, password)) {
                const res = await user.registration(
                    firstName,
                    lastName,
                    email,
                    password,
                );
                res && setRegistration(false);
            }

            return;
        }
        setRegistration(true);
    };

    const RegisterBlock = () => (
        <>
            <Button onClick={handleRegister}>Зарегистрироваться</Button>
            <span>Уже есть аккаунт?</span>
            <Button onClick={handleLogin} inline>
                Войти
            </Button>
        </>
    );

    const LoginBlock = () => (
        <>
            <Button onClick={handleLogin}>Войти</Button>
            <span>Ещё нет аккаунта?</span>
            <Button onClick={handleRegister} inline>
                Зарегистрироваться
            </Button>
        </>
    );

    return (
        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.title}>
                <h3>{isRegistration ? 'Регистрация' : 'Вход'}</h3>
            </div>
            <FormInput
                type="text"
                label="Имя"
                placeholder="Имя"
                value={firstName}
                required={isRegistration}
                hidden={!isRegistration}
                onChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
                type="text"
                label="Фамилия"
                placeholder="Фамилия"
                value={lastName}
                required={isRegistration}
                hidden={!isRegistration}
                onChange={(e) => setLastName(e.target.value)}
            />

            <FormInput
                type="text"
                label="E-mail"
                placeholder="E-mail"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
            />

            <FormInput
                type="password"
                label="Пароль"
                value={password}
                placeholder="Пароль"
                required
                onChange={(e) => setPassword(e.target.value)}
            />
            {isRegistration ? <RegisterBlock /> : <LoginBlock />}
        </form>
    );
};

export default LoginForm;
