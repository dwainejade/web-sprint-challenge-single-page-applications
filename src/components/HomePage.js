import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import OrderCard from './OrderCard'

const HomePage = props => {
    return (
        <Homecontainer>
            <header>
                <h1>From the backend of our oven to the frontend of your home.</h1>
            </header>
                <Link to='/buildapizza'>Build A Pizza</Link>
                {props.orders.map((order, i) => <OrderCard key={i} order={order} />)}
        </Homecontainer>
    )
}

const Homecontainer = styled.div`
    width: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    header {
        width: 100%;
        display: flex;
        justify-content: center;
        h1 {
            color: #fff;
            margin-top: 5rem;
            font-size: 3.6rem;
            backdrop-filter: brightness(40%);
            padding: 20px;
        }
    }
            a {
                text-decoration: none;
                font-size: 6rem;
                padding: 20px;
                border: 3px solid #aaa;
                color: #000;
                margin: 5rem 0 5rem 0;
                &:hover {
                    background: rgba(255, 255, 255, 0.05);
                }

`

export default HomePage;