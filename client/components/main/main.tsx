import React, { useEffect, useState } from 'react';
import { AppPropsType } from 'next/dist/next-server/lib/utils';
import { useDispatch } from 'react-redux';

import Header from '@client/components/header/header';
import Drawer from '@client/components/drawer/drawer';
import { getLocation } from '@isomorphic/store/location';
import { askForNotificationPermission } from '../../../helpers/notifications';
import { addSubscription, setSubscription } from '@isomorphic/store/subscriptions';

declare global {
  interface Window {
    workbox: any;
  }
}

const paths: { [key: string]: string } = {
  '/': 'LocNot',
  '/places': 'My Places',
  '/places/[id]': 'Place',
  '/friends': 'My Friends',
  '/reminders': 'Reminders',
  '/reminders/create': 'Create New Reminder',
  '/mentions': 'Mentions',
  '/invite': 'Invite',
  '/settings': 'Settings',
  '/places/create': 'Create New Place'
};

const createLinks: { [key: string]: string } = {
  '/places': '/places/create',
  '/reminders': '/reminders/create'
};

const Main = ({ Component, pageProps, router }: AppPropsType) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState(paths[router.pathname]);
  const [registration, setRegistration] = useState<ServiceWorkerRegistration | null>(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if ('geolocation' in navigator) {
      dispatch(getLocation());
    }
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator && window.workbox !== undefined) {
      // run only in browser
      navigator.serviceWorker.ready
        .then((reg) => {
          reg.pushManager.getSubscription().then((sub: PushSubscription | null) => {
            if (sub && !(sub.expirationTime && Date.now() > sub.expirationTime - 5 * 60 * 1000)) {
              console.log('inside getSubscription', sub);
              dispatch(setSubscription(sub));
            }
          });
          setRegistration(reg);
          return askForNotificationPermission(reg).then((sub) => {
            if (sub) {
              dispatch(addSubscription(sub));
            }
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  const onSubscribe = async (event: Event) => {
    if (registration) {
      await askForNotificationPermission(registration).then((sub) => {
        if (sub) {
          dispatch(addSubscription(sub));
        }
      });
    }
  };

  const toggleMenu = (value: boolean) => {
    setIsOpen(value);
  };

  useEffect(() => {
    setPageTitle(paths[router.pathname]);
  }, [router.pathname]);

  return (
    <div>
      <Header title={pageTitle} onMenuOpen={toggleMenu} linkToCreate={createLinks[router.pathname]} />
      <Component {...pageProps} setPageTitle={setPageTitle} onSubscribe={onSubscribe} />
      <Drawer isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Main;
