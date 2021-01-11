import React from 'react';
import { Divider, Drawer, List } from '@material-ui/core';
import { ListItemLink } from './list-item-link';

export const NavBar = () => {
  return (
    <Drawer variant={'permanent'} anchor={'left'} className="nav-bar" classes={{ paper: 'nav-bar' }}>
      <List>
        <ListItemLink text={'Home'} to={'/'} />
        <Divider />
        <ListItemLink text={'Books Search'} to={'/search/books'} />
        <ListItemLink text={'Lend Book'} to={'/lend'} />
        <Divider />
        <ListItemLink text={'Readers Search'} to={'/search/readers'} />
        <ListItemLink text={'New Reader'} to={'/reader/new'} />
        <Divider />
        <ListItemLink text={'Purchases'} to={'/search/purchases'} />
        <ListItemLink text={'New Purchase'} to={'/purchase/new'} />
      </List>
    </Drawer>
  );
};
