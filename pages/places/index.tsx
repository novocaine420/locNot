import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import List from '@client/components/list/list';
import Tabs from '@client/components/tabs/tabs';
import styles from './styles.module.scss';
import { RootState } from '@isomorphic/store/types';
import { Place } from '@isomorphic/types';
import { fetchPlaces } from '@isomorphic/store/places';

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

const Index = () => {
  const places = useSelector<RootState, Place[]>((state) => state.places.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlaces());
  }, []);

  const onTabChange = (idx: number) => {
    console.log(idx);
  };

  const tabsData = useMemo(() => {
    const list = places.map((place) => ({ ...place, title: place.name, description: 'description' }));
    return tabs.map((item) => ({ ...item, content: <List list={list} /> }));
  }, [places]);

  return (
    <div className={styles.places}>
      <Tabs tabs={tabsData} onTabChange={onTabChange} variant="fullWidth" withIndicator />
    </div>
  );
};

export default Index;
