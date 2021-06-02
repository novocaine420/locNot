import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import styles from './styles.module.scss';

type SimplePlaceCardProps = {
  imageSrc: string;
  title: string;
  description: string;
  onOpen: () => void;
  onDelete: () => void;
  date: string;
};

const SimplePlaceCard = ({ imageSrc, title, description, date, onOpen, onDelete }: SimplePlaceCardProps) => {
  return (
    <Card className={styles.placeCard}>
      <CardActionArea onClick={onOpen}>
        <CardMedia className={styles.media} image={imageSrc} title={title} />
        <CardContent className={styles.placeCardContent}>
          <div>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
            </Typography>
          </div>
          <Typography className={styles.date} gutterBottom variant="body2" component="span">
            {date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={onOpen}>
          See
        </Button>
        <Button size="small" color="primary" onClick={onDelete}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default SimplePlaceCard;
