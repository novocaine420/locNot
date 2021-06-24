import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles.module.scss';

type ContentBlockProps = {
  imageSrc: string;
  message: string;
};

const ContentBlock = ({ imageSrc, message }: ContentBlockProps) => (
  <div>
    <img className={styles.picture} src={imageSrc} alt="" />
    <Typography variant="h6" className={styles.message}>
      {message}
    </Typography>
  </div>
);

export default ContentBlock;
