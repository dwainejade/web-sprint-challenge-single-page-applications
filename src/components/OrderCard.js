import React from 'react';
import styled from 'styled-components';

const OrderCard = ({ order }) => {


    const displayToppings = () => {
        const toppings = Object.keys(order.toppings);

        const orderedToppings = []

        toppings.forEach(key => {
            if (order.toppings[key]) {
                orderedToppings.push(key);
            }
        })
        return orderedToppings;
    }

        return (
            <div>
            <h2>{order.name}</h2>
            <h3>{order.phone}</h3>
            <p>{order.size}</p>
            {displayToppings().map((topping, i) => <p key={i}>{topping}</p>)}
            <p>{order.instructions}</p>
            </div>
    );
    
}
export default OrderCard;