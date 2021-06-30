import { MouseEvent } from 'react';
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
  const subscription = useSelector<RootState, PushSubscription | null>((state) => state.subscription.data);

  const dispatch = useDispatch();

  const unsubscribeButtonOnClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> = async (event) => {
    try {
      await subscription?.unsubscribe();
      dispatch(deleteSubscription());
    } catch (err) {
      console.error(err);
    }
  };

  const sendNotificationButtonOnClick: (event: MouseEvent<HTMLButtonElement>) => Promise<void> = async (event) => {
    if (subscription == null) {
      console.error('web push not subscribed');
      return;
    }
    await sendNotification(subscription, { message: 'hello from client!' });
  };

  return (
    <div className={styles.container}>
      <Button className={styles.button} color="primary" onClick={onSubscribe} disabled={!!subscription}>
        Subscribe
      </Button>
      <Button className={styles.button} color="primary" onClick={unsubscribeButtonOnClick} disabled={!subscription}>
        Unsubscribe
      </Button>
      <Button
        className={styles.button}
        color="primary"
        onClick={sendNotificationButtonOnClick}
        disabled={!subscription}
      >
        Send Notification
      </Button>
    </div>
  );
}
