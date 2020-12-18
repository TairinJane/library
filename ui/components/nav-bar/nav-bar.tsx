import React from 'react';
import { Drawer, List } from '@material-ui/core';
import { ListItemLink } from './list-item-link';

export const NavBar = () => {
  return (
    <Drawer variant={'permanent'} anchor={'left'} className="nav-bar" classes={{ paper: 'nav-bar' }}>
      <List>
        <ListItemLink text={'Home'} to={'/'} />
        <ListItemLink text={'Books Search'} to={'/search/books'} />
        <ListItemLink text={'Readers Search'} to={'/search/readers'} />
        <ListItemLink text={'Lend a Book'} to={'/lend'} />
        <ListItemLink text={'Due Books'} to={'/due'} />
      </List>
    </Drawer>
  );
};
