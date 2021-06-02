import React, { useEffect, useState } from 'react';
import { AppPropsType } from 'next/dist/next-server/lib/utils';

import Header from '@client/components/header/header';
import Drawer from '@client/components/drawer/drawer';

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

  const toggleMenu = (value: boolean) => {
    setIsOpen(value);
  };

  useEffect(() => {
    setPageTitle(paths[router.pathname]);
  }, [router.pathname]);

  return (
    <div>
      <Header title={pageTitle} onMenuOpen={toggleMenu} linkToCreate={createLinks[router.pathname]} />
      <Component {...pageProps} setPageTitle={setPageTitle} />
      <Drawer isOpen={isOpen} toggleMenu={toggleMenu} />
    </div>
  );
};

export default Main;
