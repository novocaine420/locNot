import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import styles from './styles.module.scss';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box className={styles.tabPanelBox} p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

type TabsProps = {
  tabs: any;
  withIndicator?: boolean;
  onTabChange: (idx: number) => void;
  variant: 'scrollable' | 'standard' | 'fullWidth' | undefined;
};

export default function FullWidthTabs({ tabs, withIndicator = false, onTabChange, variant }: TabsProps) {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
    onTabChange(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
    onTabChange(index);
  };

  return (
    <div className={styles.tabs}>
      <AppBar position="static" color="transparent" className={styles.tabsHeader}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor={withIndicator ? 'secondary' : undefined}
          textColor="secondary"
          variant={variant}
          aria-label="full width tabs example"
        >
          {tabs.map((tab: any, idx: number) => (
            <Tab key={tab.id} label={tab.title} {...a11yProps(idx)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        className={styles.swipeableViews}
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        {tabs.map((tab: any, idx: number) => (
          <TabPanel key={tab.id} value={value} index={idx} dir={theme.direction}>
            {tab.content}
          </TabPanel>
        ))}
      </SwipeableViews>
    </div>
  );
}
