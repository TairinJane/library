import './index.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router';
import { BooksPage } from './books/books-page';

const App = () => (
  <BrowserRouter basename="/">
    <Switch>
      <Route exact path="/" component={BooksPage} />
      {/*<Route exact path="/" render={() => <div>Main page</div>} />*/}
      <Route render={() => <div>No such page</div>} />
    </Switch>
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('root'));
