/* eslint-disable */

import logo from './logo.svg';
import './App.css';
import { Route, BrowserRouter, Redirect, Switch, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import BookingCar from './pages/BookingCar';
import 'antd/dist/antd.css';
import UserBookings from './pages/UserBookings';
import AddCar from './pages/AddCar';
import AdminHome from './pages/AdminHome';
import EditCar from './pages/EditCar';
import PageTransition from './components/PageTransition';
import Preloader from './components/Preloader';

const withTransition = (Component) => (props) => (
  <PageTransition>
    <Component {...props} />
  </PageTransition>
);

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Switch location={location} key={location.pathname}>
        <Route path='/' exact component={withTransition(Home)} />
        <Route path='/login' exact component={withTransition(Login)} />
        <Route path='/register' exact component={withTransition(Register)} />
        <ProtectedRoute path='/booking/:carid' exact component={withTransition(BookingCar)} />
        <ProtectedRoute path='/userbookings' exact component={withTransition(UserBookings)} />
        <ProtectedRoute path='/addcar' exact component={withTransition(AddCar)} />
        <ProtectedRoute path='/editcar/:carid' exact component={withTransition(EditCar)} />
        <ProtectedRoute path='/admin' exact component={withTransition(AdminHome)} />
      </Switch>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div className="App">
      <Preloader />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </div>
  );
}

export default App;

export function ProtectedRoute(props) {
    if(localStorage.getItem('user')) {
      return <Route {...props}/>
    } else {
      return <Redirect to='/login'/>
    }
}
