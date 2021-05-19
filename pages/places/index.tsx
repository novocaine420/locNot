import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import List from '@client/components/list/list';
import Tabs from '@client/components/tabs/tabs';
import styles from './styles.module.scss';
import { RootState } from '@isomorphic/store/types';
import { Place } from '@isomorphic/types';

const tabs = [
  {
    title: 'All',
    content: <div>Content One</div>
  },
  {
    title: 'Favorite',
    content: <div>Content Two</div>
  },
  {
    title: 'Planned',
    content: <div>Content Three</div>
  },
  {
    title: 'Desired',
    content: <div>Content Three</div>
  }
];

// const list1 = [
//   {
//     id: 0,
//     title: 'Lviv, Forum',
//     description: 'Shopping centre',
//     location: {
//       lat: 49.85009222044209,
//       lng: 24.022288269212552
//     }
//   },
//   {
//     id: 1,
//     title: 'Lviv Croissants',
//     description: 'Bakery',
//     location: {
//       lat: 49.842558811868535,
//       lng: 24.031724555609326
//     }
//   },
//   {
//     id: 2,
//     title: 'Avalon',
//     description: 'Apartment complex',
//     location: {
//       lat: 49.85581385089976,
//       lng: 24.026257519081764
//     }
//   },
//   {
//     id: 3,
//     title: 'Elite gym',
//     description: 'Gym',
//     location: {
//       lat: 49.846724387595806,
//       lng: 24.022658121941593
//     }
//   }
// ];

const Index = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const places = useSelector<RootState, Place[]>((state) => state.places.data);

  const onTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  const tabsData = useMemo(() => {
    const list = places.map((place) => ({ ...place, title: place.name, description: 'description' }));
    return tabs.map((item) => ({ ...item, content: <List list={list} /> }));
  }, [tabIndex]);

  return (
    <div className={styles.places}>
      <Tabs tabs={tabsData} onTabChange={onTabChange} variant="fullWidth" withIndicator />
    </div>
  );
};

export default Index;
