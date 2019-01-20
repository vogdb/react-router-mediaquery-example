import Media from "react-media";
import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom';

const InvoiceList = (props) => {
  return <ul>
    <li key="dashboard">
      <Link to="/invoices/dashboard"><span>Dashboard</span></Link>
    </li>
    {props.invoices.map((invoice) =>
      <li key={invoice.id}>
        <p><Link to={`/invoices/${invoice.id}`}><span>To:</span>{invoice.to}</Link></p>
        <p><span>Amount:</span>{invoice.amount}</p>
        <p><span>Paid:</span>{invoice.paid ? 'Yes' : 'No'}</p>
        <p><span>Due:</span>{invoice.due.toDateString()}</p>
      </li>
    )}
  </ul>
};

const Dashboard = (props) => {
  const balance = props.invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const unpaidNum = props.invoices.reduce((num, invoice) => num + !invoice.paid, 0);
  return <div>
    Dashboard:
    <div>Unpaid: {unpaidNum}</div>
    <div>Balance: {balance}</div>
  </div>
};

const Invoice = (props) => {
  const id = parseInt(props.match.params.id);
  const invoice = props.invoices.find(invoice => invoice.id === id);
  return <div>
    Invoice #{id}, to: {invoice.to}
  </div>
};

const Layout = (props) => (
  <div className="invoicesLayout">
    {props.children}
  </div>
);

const InvoicesSmallScreen = (props) => {
  const {invoices} = props;
  
  return (<div>
    <Link to="/invoices">Show Invoices</Link>
    <Switch>
      <Route exact path="/invoices" render={props => <InvoiceList invoices={invoices} {...props}/>}/>
      <Route exact path="/invoices/dashboard" render={props => <Dashboard invoices={invoices} {...props}/>}/>
      <Route path="/invoices/:id" render={props => <Invoice invoices={invoices} {...props}/>}/>
    </Switch>
  </div>)
};

const InvoicesBigScreen = (props) => {
  const {invoices} = props;
  return (<div>
    <InvoiceList invoices={invoices}/>
    <Switch>
      <Route exact path="/invoices/dashboard" render={props => <Dashboard invoices={invoices} {...props}/>}/>
      <Route path="/invoices/:id" render={props => <Invoice invoices={invoices} {...props}/>}/>
    </Switch>
  </div>)
};

class Invoices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoices: []
    }
  }

  componentDidMount() {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const tomorrow = new Date();
    yesterday.setDate(today.getDate() + 1);

    const data = [
      {
        id: 1,
        to: 'Mr. Smith',
        amount: 10,
        paid: true,
        due: today,
      },
      {
        id: 2,
        to: 'Mrs. Jones',
        amount: 100,
        paid: false,
        due: tomorrow
      },
      {
        id: 3,
        to: 'Mrs. Black',
        amount: 50,
        paid: false,
        due: tomorrow
      },
    ];

    this.setState({invoices: data})
  }

  render() {
    const {invoices} = this.state;

    return (
      <Layout>
        <Media query={{maxWidth: 599}}>
          {screenIsSmall => screenIsSmall ?
            <InvoicesSmallScreen invoices={invoices}/>
            : <InvoicesBigScreen invoices={invoices}/>
          }
        </Media>
      </Layout>
    )
  }
}

export default Invoices;