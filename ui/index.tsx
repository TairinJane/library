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
import { LendPage } from './components/lend/lend-page';
import { ReaderProfile } from './components/readers/profile/reader-profile';
import { HomePage } from './components/home/home-page';
import { DuePage } from './components/due/due-page';
import { NewReaderPage } from './components/readers/new/new-reader-page';
import { PurchasesSearchPage } from './components/purchases/purchase-search';
import { NewPurchase } from './components/purchases/new-purchase';
import { NewEvent } from './components/events/new-event';
import { EventsSearch } from './components/events/events-search';
import { AuthorsSearch } from './components/authors/author-search';
import { NewAuthor } from './components/authors/new-author';
import { AuthorProfile } from './components/authors/profile';
import { BookProfile } from './components/books/profile/profile';

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
              <Route exact path="/books" component={BooksSearchPage} />
              <Route exact path="/books/lend" component={LendPage} />
              <Route exact path="/books/:id" component={BookProfile} />
              <Route exact path="/books/due" component={DuePage} />
              <Route exact path="/purchases" component={PurchasesSearchPage} />
              <Route exact path="/purchases/new" component={NewPurchase} />
              <Route exact path="/readers" component={ReadersSearchPage} />
              <Route exact path="/readers/new" component={NewReaderPage} />
              <Route exact path="/readers/:id" component={ReaderProfile} />
              <Route exact path="/events" component={EventsSearch} />
              <Route exact path="/events/new" component={NewEvent} />
              <Route exact path="/authors" component={AuthorsSearch} />
              <Route exact path="/authors/new" component={NewAuthor} />
              <Route exact path="/authors/:id" component={AuthorProfile} />
              <Route render={() => <div>No such page</div>} />
            </Switch>
          </Container>
        </MainContent>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
