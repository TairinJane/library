import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { BooksPage } from './components/books/books-page';
import { NavBar } from './components/nav-bar/nav-bar';
import { MainContent } from './components/containers/main-content';
import { Container } from '@material-ui/core';
import { Provider } from 'react-redux';
import { configureStore } from './store/configure.store';
import { ReadersPage } from './components/readers/readers-page';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NavBar />
        <MainContent>
          <Container>
            <Switch>
              <Route exact path="/search/books" component={BooksPage} />
              <Route exact path="/search/readers" component={ReadersPage} />
              <Route render={() => <div>No such page</div>} />
            </Switch>
          </Container>
        </MainContent>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
