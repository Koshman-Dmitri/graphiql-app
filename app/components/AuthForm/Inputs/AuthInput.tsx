import { forwardRef } from 'react';
import styles from './AuthInput.module.css';

interface BaseInputProps {
  id: string;
  type: string;
  error: string;
  title: string;
  name?: string;
  value?: string;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type RHFInputProps = Omit<BaseInputProps, 'name' | 'value' | 'onBlur'>;
type ControlledInputProps = Required<Pick<BaseInputProps, 'name' | 'value' | 'onBlur'>> &
  Omit<BaseInputProps, 'name' | 'value' | 'onBlur'>;

type InputProps = RHFInputProps & Partial<ControlledInputProps>;

const AuthInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, onChange, title, error, name = '', onBlur = () => {}, value = '' }, ref) => {
    return (
      <div className={styles.inputGroup}>
        <label htmlFor={id} className={styles.label}>
          {title}
          <input
            type={type}
            id={id}
            name={name}
            onChange={onChange}
            value={value}
            onBlur={onBlur}
            ref={ref}
            className={`${styles.input} ${error ? styles.errorInput : ''}`}
            required
          />
        </label>
        {error && <p className={styles.errorText}>{error}</p>}
      </div>
    );
  }
);

AuthInput.displayName = 'AuthInput';

export default AuthInput;
