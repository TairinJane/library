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
import { ReadersSearchPage } from './components/readers/search/readers-search-page';
import { LendPage } from './components/lend-books/lend-page';
import { ReaderProfile } from './components/readers/profile/reader-profile';
import { HomePage } from './components/home/home-page';
import { DuePage } from './components/due/due-page';
import { NewReaderPage } from './components/readers/new/new-reader-page';
import { PurchasesSearchPage } from './components/purchases/purchase-search';

const App = () => {
  const store = configureStore();
  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <NavBar />
        <MainContent>
          <Container>
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/search/books" component={BooksSearchPage} />
              <Route exact path="/search/readers" component={ReadersSearchPage} />
              <Route exact path="/search/purchases" component={PurchasesSearchPage} />
              <Route exact path="/lend" component={LendPage} />
              <Route exact path="/due" component={DuePage} />
              <Route exact path="/reader/new" component={NewReaderPage} />
              <Route exact path="/reader/:id" component={ReaderProfile} />
              <Route render={() => <div>No such page</div>} />
            </Switch>
          </Container>
        </MainContent>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
