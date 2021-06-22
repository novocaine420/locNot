import React from 'react';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

type DateAndTimePickerProps = {
  value: string;
  onChange: (value: string) => void;
};

export default function DateAndTimePicker({ value, onChange }: DateAndTimePickerProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <form className={styles.datePicker} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2021-01-01T12:00"
        value={value}
        className={styles.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
      />
    </form>
  );
}
