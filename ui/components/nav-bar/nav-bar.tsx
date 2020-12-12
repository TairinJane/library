import React from 'react';
import { Drawer, List } from '@material-ui/core';
import { ListItemLink } from './list-item-link';

export const NavBar = () => {
  return (
    <Drawer variant={'permanent'} anchor={'left'} className="nav-bar" classes={{ paper: 'nav-bar' }}>
      <List>
        <ListItemLink text={'Home'} to={'/'} />
        <ListItemLink text={'Books'} to={'/books'} />
        <ListItemLink text={'Readers'} to={'/readers'} />
      </List>
    </Drawer>
  );
};
