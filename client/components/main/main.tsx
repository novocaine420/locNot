import React, { useState } from 'react';
import { AppPropsType } from 'next/dist/next-server/lib/utils';

import Header from '@client/components/header/header';
import Drawer from '@client/components/drawer/drawer';

const paths: { [key: string]: string } = {
  '/': 'LocNot',
  '/places': 'My Places',
  '/friends': 'My Friends',
  '/reminders': 'Reminders',
  '/mentions': 'Mentions',
  '/invite': 'Invite',
  '/settings': 'Settings',
  '/places/create': 'Create New Place'
};

const Main = ({ Component, pageProps, router }: AppPropsType) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = (value: boolean) => {
    setIsOpen(value);
  };

  return (
    <div>
      <Header title={paths[router.pathname]} onMenuOpen={toggleMenu} />
      <Component {...pageProps} />
      <Drawer isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Main;
