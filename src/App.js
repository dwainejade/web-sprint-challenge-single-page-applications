import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import NavBar from './components/Navbar'
import PizzaForm from './components/PizzaForm.js';
import HomePage from './components/HomePage';


function App() {
  const [orders, setOrders] = useState([]);



  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/buildapizza'>
          <PizzaForm  />
        </Route>
        <Route exact path='/'>
          <HomePage />
        </Route>
      </Switch>
    </>
  );
};
export default App;
