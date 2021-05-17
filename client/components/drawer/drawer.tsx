import React from 'react';
import Link from 'next/link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import styles from './styles.module.scss';

type DrawerProps = {
  isOpen: boolean;
  toggleMenu: (open: boolean) => void;
};

const menuData = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'My Places',
    path: '/places'
  },
  {
    title: 'My Friends',
    path: '/friends'
  },
  {
    title: 'Reminders',
    path: '/reminders'
  },
  {
    title: 'My Mentions',
    path: '/mentions'
  },
  {
    title: 'Invite',
    path: '/invite'
  },
  {
    title: 'Settings',
    path: '/settings'
  }
];

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
