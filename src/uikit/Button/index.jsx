import cn from 'classnames';

import styles from './styles.scss';

const Button = ({ size = 'md', className, inline = false, ...props }) => (
    <button
        className={cn(
            className,
            inline ? styles.inline : styles.button,
            styles[size],
        )}
        {...props}
    />
);

export default Button;
