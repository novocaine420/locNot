import { useState, useEffect } from 'react';

import { createTable, createReminder, deleteTable, getItems, readItem } from '../helpers/aws-api';
import styles from '../styles/Home.module.css';

const base64ToUint8Array = (base64) => {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export default function Home() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState(null);
  const [registration, setRegistration] = useState(null);

  const askForNotificationPermission = async (reg) => {
    const sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY)
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub);
    setIsSubscribed(true);
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub) => {
          if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
            setSubscription(sub);
            setIsSubscribed(true);
          }
        });
        setRegistration(reg);
        askForNotificationPermission(reg).catch((err) => console.error(err));
      });
    }
  }, []);

  const subscribeButtonOnClick = async (event) => {
    event?.preventDefault();
    try {
      await askForNotificationPermission(registration);
      console.log('web push subscribed!');
      console.log(subscription);
    } catch (err) {
      console.error(err);
    }
  };

  const unsubscribeButtonOnClick = async (event) => {
    event.preventDefault();
    try {
      await subscription.unsubscribe();
      // TODO: you should call your API to delete or invalidate subscription data on server
      setSubscription(null);
      setIsSubscribed(false);
      console.log('web push unsubscribed!');
    } catch (err) {
      console.error(err);
    }
  };

  const sendNotificationButtonOnClick = async (event) => {
    event.preventDefault();
    if (subscription == null) {
      console.error('web push not subscribed');
      return;
    }
    try {
      await fetch('/api/notification', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          subscription,
          message: 'hello from client!'
        })
      });
    } catch (err) {
      console.error(err);
    }
  };

  // const getS3Buckets = () => {
  //   s3.listBuckets((err, data) => {
  //     if (err) {
  //       console.log('Error', err);
  //     } else {
  //       console.log('Success', data.Buckets);
  //     }
  //   });
  // };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing <code className={styles.code}>pages/index.js</code>
        </p>

        <div>
          <button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
            Subscribe
          </button>
          <button onClick={unsubscribeButtonOnClick} disabled={!isSubscribed}>
            Unsubscribe
          </button>
          <button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed}>
            Send Notification
          </button>
          <button onClick={createTable}>Create table</button>
          <button onClick={deleteTable}>Delete table</button>
          <button onClick={createReminder}>Create reminder</button>
          <button onClick={getItems}>Get items</button>
          <button onClick={readItem}>Read item</button>
          {/*<button onClick={getS3Buckets}>Get S3 bucket</button>*/}
        </div>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Documentation &rarr;</h3>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>Learn &rarr;</h3>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a href="https://github.com/vercel/next.js/tree/master/examples" className={styles.card}>
            <h3>Examples &rarr;</h3>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Deploy &rarr;</h3>
            <p>Instantly deploy your Next.js site to a public URL with Vercel.</p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  );
}
