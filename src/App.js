import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Home from './Components/Home';
import Review from './Components/Review.jsx';
import ProductReview from './Components/ProductReview';

export default function OliverTakeHome() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path='/product-reviews'>
            <ProductReview />
          </Route>
          <Route exact path='/review'>
            <Review />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
