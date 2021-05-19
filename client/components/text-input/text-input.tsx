import React from 'react';
import TextField from '@material-ui/core/TextField';

import styles from './styles.module.scss';

type TextInputType = {
  value: string;
  label?: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
};

export default function TextInput({
  value = '',
  onChange,
  multiline = false,
  placeholder = 'Enter something',
  label = 'Text'
}: TextInputType) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <form className={styles.textInput} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-multiline-static"
          label={label}
          fullWidth
          multiline={multiline}
          rows={4}
          value={value}
          defaultValue="Default Value"
          variant="outlined"
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </form>
  );
}
