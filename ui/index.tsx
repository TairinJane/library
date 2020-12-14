import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { BooksPage } from './components/books/books-page';
import { NavBar } from './components/nav-bar/nav-bar';
import { MainContent } from './components/containers/main-content';
import { Container } from '@material-ui/core';

const App = () => (
  <BrowserRouter basename="/">
    <NavBar />
    <MainContent>
      <Container>
        <Switch>
          <Route exact path="/" component={BooksPage} />
          <Route render={() => <div>No such page</div>} />
        </Switch>
      </Container>
    </MainContent>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
