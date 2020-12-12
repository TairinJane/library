import React from 'react';
import { Button, Navbar } from '@blueprintjs/core';
import { Alignment } from '@blueprintjs/core/lib/esm/common/alignment';

export const Header = () => {
  return (
    <Navbar>
      <Navbar.Group align={Alignment.LEFT}>
        <Navbar.Heading>Library</Navbar.Heading>
        <Navbar.Divider />
        <Button className="bp3-minimal" icon="home" text="Home" />
        <Button className="bp3-minimal" icon="document" text="Files" />
      </Navbar.Group>
    </Navbar>
  );
};
