import { Button } from '@/uikit';

const ErrorMessage = ({ children, buttonText = null, navigateTo = null }) => {
    return (
        <>
            <h2>{children}</h2>
            {buttonText && <Button onClick={navigateTo}>{buttonText}</Button>}
        </>
    );
};
export default ErrorMessage;
