import styles from './AuthInput.module.css';

interface InputProps {
  id: string;
  type: string;
  value: string;
  title: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

function AuthInput({ id, value, type, onChange, title }: InputProps) {
  return (
    <div className={styles.inputGroup}>
      <label htmlFor={id} className={styles.label}>
        {title}
        <input
          type={type}
          id="name"
          value={value}
          onChange={onChange}
          className={styles.input}
          required
        />
      </label>
    </div>
  );
}

export default AuthInput;
