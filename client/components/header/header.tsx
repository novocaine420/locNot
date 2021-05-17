import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';

import styles from './styles.module.scss';

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

type HeaderProps = {
  title: string;
  onMenuOpen: (open: boolean) => void;
};

function HideOnScroll(props: Props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Header({ title, onMenuOpen }: HeaderProps) {
  return (
    <div className={styles.header}>
      <HideOnScroll>
        <AppBar>
          <Toolbar>
            <IconButton
              edge="start"
              className={styles.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => onMenuOpen(true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={styles.title}>
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </div>
  );
}
