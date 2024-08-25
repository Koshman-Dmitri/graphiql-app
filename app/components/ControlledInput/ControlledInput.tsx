import { ChangeEvent } from 'react';

interface Props {
  className: string;
  name: string;
  value: string;
  placeholder: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export default function ControlledInput({
  className,
  name,
  value,
  placeholder,
  handleChange,
}: Props) {
  return (
    <input
      className={className}
      type="text"
      name={name}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e)}
      placeholder={placeholder}
    />
  );
}
