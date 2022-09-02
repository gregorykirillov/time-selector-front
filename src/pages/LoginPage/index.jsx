import { observer } from 'mobx-react-lite';

import { LoginForm, ProfileForm } from '@/components';
import user from '@/store/user';

const LoginPage = observer(() => {
    return <>{user.isAuth ? <ProfileForm /> : <LoginForm />}</>;
});

export default LoginPage;
