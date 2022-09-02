import { useId } from 'react';

import { Input } from '@/uikit';

import styles from './styles.scss';

const FormInput = ({ hidden, label, ...props }) => {
    const id = useId();

    return (
        <div className={styles.wrapper} hidden={hidden}>
            <label htmlFor={id}>{label}</label>
            <Input id={id} {...props} />
        </div>
    );
};

export default FormInput;
