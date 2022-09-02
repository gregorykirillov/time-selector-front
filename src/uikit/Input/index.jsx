import cn from 'classnames';

import styles from './styles.scss';

const Input = ({ size = 'md', className, ...props }) => (
    <input className={cn(className, styles.input, styles[size])} {...props} />
);

export default Input;
