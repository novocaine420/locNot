import React, { useEffect, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import styles from './styles.module.scss';
import { RootState } from '@isomorphic/store/types';
import { Place } from '@isomorphic/types';
import GoogleMap from '@client/components/google-map/google-map';
import ContentBlock from '@client/components/content-block/content-block';
import Tabs from '@client/components/tabs/tabs';
import { fetchPlace } from '@isomorphic/store/place';

type PlaceProps = { id: string };

const Index = ({ id }: PlaceProps) => {
  const [tabIndex, setTabIndex] = useState(0);
  const place = useSelector<RootState, Place>((state) => state.place.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlace(id));
  }, []);

  const onTabChange = (idx: number) => {
    setTabIndex(idx);
  };

  const tabs = useMemo(() => {
    return [
      {
        title: 'Info',
        content: <GoogleMap location={place?.location} />
      },
      {
        title: 'Content',
        content: <ContentBlock images={place?.content} message={place?.message} />
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
  }, [place]);

  return (
    <div className={styles.place}>
      <Tabs tabs={tabs} onTabChange={onTabChange} variant="scrollable" />
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({ props: { id: query.id } });
