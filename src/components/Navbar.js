import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const NavBar = props => {
    return (
        <Navigation>
            <h1>Lambda Eats</h1>
            <Link to='/'>Home</Link>
        </Navigation>
    );
}

const Navigation = styled.nav`
    position: fixed;
    top: 0;
    width: 100%;
    background: black;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    height: 4rem;
    color: #fff;
    a {
        text-decoration: none;
        color: #fff;
        font-weight: bold;
        margin-right: 40px;
        font-size: 1.8rem;
    }
`

export default NavBar;