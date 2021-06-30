import React from 'react';
import Link from 'next/link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import { menuData } from '@client/constants';
import styles from './styles.module.scss';

type DrawerProps = {
  isOpen: boolean;
  toggleMenu: (open: boolean) => void;
};

export default function Drawer({ isOpen, toggleMenu }: DrawerProps) {
  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    toggleMenu(open);
  };

  // const displayConfirmNotification = () => {
  //   if ('serviceWorker' in navigator) {
  //     const options: {
  //       body: string;
  //       icon: string;
  //       image: string;
  //       dir: NotificationDirection;
  //       lang: string;
  //       vibrate: number[];
  //       badge: string;
  //       tag: string;
  //       renotify: boolean;
  //       actions: {
  //         action: string;
  //         title: string;
  //         icon: string;
  //       }[];
  //     } = {
  //       body: 'You successfully subscribed to our notification service',
  //       icon: '/icons/icon-96x96.png',
  //       image: '/icons/icon-96x96.png',
  //       dir: 'ltr',
  //       lang: 'en-US',
  //       vibrate: [100, 50, 200],
  //       badge: '/icons/icon-96x96.png',
  //       tag: 'confirm-notification',
  //       renotify: true,
  //       actions: [
  //         { action: 'confirm', title: 'OK', icon: '/icons/icon-96x96.png' },
  //         { action: 'cancel', title: 'Cancel', icon: '/icons/icon-96x96.png' }
  //       ]
  //     };
  //     navigator.serviceWorker.ready.then((swReg) => {
  //       swReg.showNotification('Successfully subscribed! from SW', options);
  //     });
  //   }
  // };

  const list = () => (
    <div className={styles.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
      <List>
        {menuData.map((item, index) => (
          <ListItem button key={item.title}>
            <Link href={item.path}>
              <a className={styles.menuLink}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={item.title} />
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <SwipeableDrawer anchor="left" open={isOpen} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
        {list()}
      </SwipeableDrawer>
    </div>
  );
}
