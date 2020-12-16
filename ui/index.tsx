import './index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { BooksSearchPage } from './components/books/books-search-page';
import { NavBar } from './components/nav-bar/nav-bar';
import { MainContent } from './components/containers/main-content';
import { Container } from '@material-ui/core';
import { Provider } from 'react-redux';
import { configureStore } from './store/configure.store';
import { ReadersSearchPage } from './components/readers/readers-search-page';
import { LendPage } from './components/lend-books/lend-page';
import { ReaderPage } from './components/readers/reader-page';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NavBar />
        <MainContent>
          <Container>
            <Switch>
              <Route exact path="/search/books" component={BooksSearchPage} />
              <Route exact path="/search/readers" component={ReadersSearchPage} />
              <Route exact path="/lend" component={LendPage} />
              <Route exact path="/reader/:id" component={ReaderPage} />
              <Route render={() => <div>No such page</div>} />
            </Switch>
          </Container>
        </MainContent>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
