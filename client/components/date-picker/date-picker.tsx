import React from 'react';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

type DateAndTimePickerProps = {
  onChange: (value: string) => void;
};

export default function DateAndTimePicker({ onChange }: DateAndTimePickerProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <form className={styles.datePicker} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={styles.textField}
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
      />
    </form>
  );
}
