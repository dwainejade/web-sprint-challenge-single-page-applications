import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HomePage = props => {
    return (
        <Homecontainer>
            <header>
                <h1>From the backend of our oven to the frontend of your home.</h1>
            </header>
            <Link to='/buildapizza'>Build A Pizza</Link>
            
        </Homecontainer>
    );
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
        font-size: 3rem;
        padding: 20px;
        border: 3px solid #aaa;
        color: #000;
        margin: 5rem 0 5rem 0;
        &:hover {
            background: rgb(58, 141, 213);
            color: white;
        }
`

export default HomePage;