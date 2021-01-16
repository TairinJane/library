import React from 'react';
import { Divider, Drawer, List } from '@material-ui/core';
import { ListItemLink } from './list-item-link';

export const NavBar = () => {
  return (
    <Drawer variant={'permanent'} anchor={'left'} className="nav-bar" classes={{ paper: 'nav-bar' }}>
      <List>
        <ListItemLink text={'Home'} to={'/'} />
        <Divider />
        <ListItemLink text={'Books Search'} to={'/books'} />
        <ListItemLink text={'Lend Book'} to={'/books/lend'} />
        <Divider />
        <ListItemLink text={'Readers Search'} to={'/readers'} />
        <ListItemLink text={'New Reader'} to={'/readers/new'} />
        <Divider />
        <ListItemLink text={'Authors'} to={'/authors'} />
        <ListItemLink text={'New Author'} to={'/authors/new'} />
        <Divider />
        <ListItemLink text={'Purchases'} to={'/purchases'} />
        <ListItemLink text={'New Purchase'} to={'/purchases/new'} />
        <Divider />
        <ListItemLink text={'Events'} to={'/events'} />
        <ListItemLink text={'New Event'} to={'/events/new'} />
      </List>
    </Drawer>
  );
};
