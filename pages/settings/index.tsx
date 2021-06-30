import { useState, useEffect, MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';

import styles from './styles.module.scss';
import { deleteSubscription } from '@isomorphic/store/subscriptions';
import { RootState } from '@isomorphic/store/types';
import { sendNotification } from '../../helpers/notifications';

type SettingsProps = {
  onSubscribe: () => void;
};

export default function Settings({ onSubscribe }: SettingsProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const subscription = useSelector<RootState, PushSubscription | null>((state) => state.subscription.data);

  const dispatch = useDispatch();

  useEffect(() => {
    if (subscription) {
      setIsSubscribed(true);
    }
  }, [subscription]);

  const unsubscribeButtonOnClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> = async (event) => {
    event.preventDefault();
    try {
      await subscription?.unsubscribe();
      dispatch(deleteSubscription());
      setIsSubscribed(false);
      console.log('web push unsubscribed!');
    } catch (err) {
      console.error(err);
    }
  };

  const sendNotificationButtonOnClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> = async (event) => {
    event.preventDefault();
    if (subscription == null) {
      console.error('web push not subscribed');
      return;
    }
    try {
      await sendNotification(subscription, { message: 'hello from client!' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.container}>
      <Button className={styles.button} color="primary" onClick={onSubscribe} disabled={isSubscribed}>
        Subscribe
      </Button>
      <Button className={styles.button} color="primary" onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
        Unsubscribe
      </Button>
      <Button
        className={styles.button}
        color="primary"
        onClick={sendNotificationButtonOnClick}
        disabled={!isSubscribed}
      >
        Send Notification
      </Button>
    </div>
  );
}
