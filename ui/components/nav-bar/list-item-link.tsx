import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

export type TNavBarLink = {
  icon?: React.ReactElement;
  title: string;
  to: string;
};

export const ListItemLink = ({ icon, title, to }: TNavBarLink) => {
  const renderLink = React.useMemo(
    () => React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink} className="bp3-ui-text">
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={title} />
      </ListItem>
    </li>
  );
};
