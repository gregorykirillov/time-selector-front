import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Routes } from 'react-router-dom';

import {
    OptionsPage,
    SelectDatePage,
    LoginPage,
    MainPage,
    SurveyPage,
    ResultPage,
    Page404,
} from '@/pages';
import { LocalStorage } from '@/services';
import { Preloader } from '@/uikit';
import Header from '@/parts/Header';
import user from '@/store/user';

import styles from './styles.scss';

const App = observer(() => {
    useEffect(() => {
        if (LocalStorage.get('token')) {
            user.checkAuth();
        }
    }, [user]);

    return (
        <div className={styles.content}>
            <Header />

            {user.isLoading ? (
                <Preloader />
            ) : (
                <Routes>
                    <Route exact path="/" element={<MainPage />} />
                    <Route exact path="/login" element={<LoginPage />} />

                    <Route
                        exact
                        path="/survey/:link"
                        element={<SurveyPage />}
                    />

                    <Route exact path="/create" element={<SelectDatePage />} />
                    <Route exact path="/options" element={<OptionsPage />} />
                    <Route exact path="/result" element={<ResultPage />} />

                    <Route element={<Page404 />} />
                </Routes>
            )}
        </div>
    );
});

export default App;
