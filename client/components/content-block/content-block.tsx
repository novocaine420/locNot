import React from 'react';
import Typography from '@material-ui/core/Typography';

import styles from './styles.module.scss';

type ContentBlockProps = {
  images: string[];
  message: string;
};

const ContentBlock = ({ images, message }: ContentBlockProps) => {
  return (
    <div>
      {images.map((image: string, idx: number) => (
        <img className={styles.picture} src={image} key={idx} alt="" />
      ))}
      <Typography variant="h6" className={styles.message}>
        {message}
      </Typography>
    </div>
  );
};

export default ContentBlock;
