import React, { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import List from '@client/components/list/list';
import { RootState } from '@isomorphic/store/types';
import { deleteReminder, fetchReminders } from '@isomorphic/store/reminders';
import { Reminder } from '@isomorphic/types';
import styles from './styles.module.scss';

const Index = () => {
  const router = useRouter();
  const reminders = useSelector<RootState, Reminder[]>((state) => state.reminders.list);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReminders());
  }, []);

  const onPlaceOpen = (id: string) => () => {
    router.push(`/reminders/${id}`);
  };

  const onReminderDelete = (id: string) => () => {
    dispatch(deleteReminder(id));
  };

  const list = useMemo(
    () =>
      reminders.map((item) => ({ ...item, description: item.message, date: moment(item.date).format('DD-MM-yyyy') })),
    [reminders]
  );

  return (
    <div className={styles.places}>
      <List list={list} onItemOpen={onPlaceOpen} onItemDelete={onReminderDelete} />
    </div>
  );
};

export default Index;
