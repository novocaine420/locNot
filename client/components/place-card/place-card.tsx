import React, { useState } from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Tabs from '@client/components/tabs/tabs';
import GoogleMap from '../google-map/google-map';
import styles from './styles.module.scss';
import ContentBlock from '@client/components/content-block/content-block';

type PlaceCardProps = {
  id: number;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  content: string[];
  message: string;
  expanded: boolean;
  handleChange: (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
};

export default function PlaceCard({
  id,
  title,
  description,
  location,
  expanded,
  handleChange,
  content,
  message
}: PlaceCardProps) {
  const tabs = [
    {
      title: 'Info',
      content: <GoogleMap location={location} />
    },
    {
      title: 'Content',
      content: <ContentBlock images={content} message={message} />
    },
    {
      title: 'People',
      content: <div>Content Three</div>
    },
    {
      title: 'Notifications',
      content: <div>Content Four</div>
    }
  ];
  const [tabIndex, setTabIndex] = useState(0);

  const onTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  return (
    <div className={styles.placesCard}>
      <Accordion expanded={expanded} onChange={handleChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
          <Typography className={styles.heading}>{title}</Typography>
          <Typography className={styles.secondaryHeading}>{description}</Typography>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          <Tabs tabs={tabs} onTabChange={onTabChange} variant="scrollable" />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
