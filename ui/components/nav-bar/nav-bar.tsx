import React from 'react';
import { Divider, Drawer, List } from '@material-ui/core';
import { ListItemLink } from './list-item-link';
import { NavBarConfig } from './nav-bar.config';

export const NavBar = () => (
  <Drawer variant={'permanent'} anchor={'left'} className="nav-bar" classes={{ paper: 'nav-bar' }}>
    <List>
      {NavBarConfig.map((group, index) => (
        <>
          {group.map(link => (
            <ListItemLink {...link} key={link.title} />
          ))}
          {index !== NavBarConfig.length && <Divider />}
        </>
      ))}
    </List>
  </Drawer>
);
