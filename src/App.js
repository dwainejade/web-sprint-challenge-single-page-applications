import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/Navbar'
import PizzaForm from './components/PizzaForm.js';
import HomePage from './components/HomePage';


function App() {
  const [orders, setOrders] = useState([]);

  const addOrder = order => {
    setOrders([...orders, order]);
  }

  return (
    <>
      <NavBar />
      <Switch>
        <Route path='/buildapizza'>
          <PizzaForm  
          addOrder={addOrder}
          orders={orders}
          />
        </Route>
        <Route exact path='/'>
          <HomePage  />
        </Route>
      </Switch>
    </>
  );
};
export default App;
