import React, { useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@isomorphic/store/types';
import { Reminder } from '@isomorphic/types';
import { fetchReminder } from '@isomorphic/store/reminders';
import GoogleMap from '@client/components/google-map/google-map';
import ContentBlock from '@client/components/content-block/content-block';
import styles from './styles.module.scss';

type PlaceProps = { id: string; setPageTitle: (title: string) => void };

const Index = ({ id, setPageTitle }: PlaceProps) => {
  const reminder = useSelector<RootState, Reminder>((state) => state.reminders.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReminder(id));
  }, []);

  useEffect(() => {
    if (reminder?.title) {
      setPageTitle(reminder.title);
    }
  }, [reminder?.title]);

  return (
    <div className={styles.reminder}>
      <GoogleMap location={reminder?.location} />
      <ContentBlock imageSrc={reminder?.picture} message={reminder?.message} />
    </div>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ query }) => ({ props: { id: query.id } });
