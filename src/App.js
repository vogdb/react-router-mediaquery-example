import React from 'react';
import {Route, Redirect, BrowserRouter, Switch} from 'react-router-dom';
import Invoices from './Invoices';


const AppLayout = (props) => (
  <div className="appLayout">
    {props.children}
  </div>
);

const App = () => (
  <BrowserRouter>
    <AppLayout>
      <Switch>
        <Route path="/invoices" component={Invoices}/>
        <Redirect exact from="/" to="/invoices"/>
      </Switch>
    </AppLayout>
  </BrowserRouter>
);

export default App;