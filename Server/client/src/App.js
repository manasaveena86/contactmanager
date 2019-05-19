import React, { Component } from 'react';
import {BrowserRouter,Link,Route,Switch} from 'react-router-dom'
import Register from './components/users/Register'
import Login from './components/users/Login'
import Logout from './components/users/Logout'
import Footer from './components/Home/Footer'
import ContactNew from './components/contacts/ContactNew'
import ContactEdit from './components/contacts/ContactEdit'
import ContactShow from './components/contacts/ContactShow'
import Contact from './components/contacts/Contacts-list'
import Navbar from './components/Home/Navbar'
import PrivateRoute from './components/Home/Protected'
import Home from './components/Home/home'
import Dashboard from './components/contacts/Dashboard';
class App extends Component {
  
  render() {
    const style = {
      background: '#f2f2f2',
      height: '550px'
    }
    return (
      <BrowserRouter>
      <>
      <div style={{minHeight:'720px'}}>
       <Navbar/>
        <Switch>
        <Route path="/user/register" component={Register}/>
        <Route path="/user/login" component ={Login}/>
        <Route path ="/user/logout" component={Logout}/>
       <PrivateRoute exact path="/" component={Home}/>
       <PrivateRoute exact path="/user" component={Dashboard}/>
        <PrivateRoute path="/contacts/new" component={ContactNew} exact={true}/>
        <PrivateRoute path="/contacts/edit/:id" component={ContactEdit} exact={true}/>
        <PrivateRoute path="/contacts/:id" component={ContactShow} exact={true}/>
        <PrivateRoute path="/contacts" component={Contact} exact={true}/>
        
        </Switch>
      </div>
      <Footer/>
      </>
      </BrowserRouter>
    )
  }  
}

export default App
