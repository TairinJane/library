import React from 'react';
import { Link, LinkProps } from 'react-router-dom';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

type Props = {
  icon?: React.ReactElement;
  text: string;
  to: string;
};

export const ListItemLink = ({ icon, text, to }: Props) => {
  const renderLink = React.useMemo(
    () => React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink} className="bp3-ui-text">
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
};
