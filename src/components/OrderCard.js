import React from 'react';
import styled from 'styled-components';

const OrderCard = ({ order }) => {


    const pizzaToppings = () => {
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
        <Reciepts>
            <h2 style={{ textAlign: 'center' }}>{order.name}</h2>
            <p>Phone: {order.phone}</p>
            <p>Size: {order.size}</p>
            <p>Toppings:
            {pizzaToppings().map((topping, i) => <span key={i}> {topping}, </span>)}
            </p>
            <p>Special Instructions: {order.instructions}</p>
        </Reciepts>
    );
}

const Reciepts = styled.nav`
    border: 2px solid black;
    width: 200px;
    justify-content: space-evenly;
    color: black;

`

export default OrderCard;