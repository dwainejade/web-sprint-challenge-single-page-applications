import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';
import OrderCard from './OrderCard';

const schema = yup.object().shape({
    name: yup.string()
        .required('Please enter your name')
        .min(2, 'That\'s not a real name.'),
    phone: yup.string()
        .required('Please enter a phone number.')
        .matches(/^[0-9]{10}$/, 'Please enter a valid phone number.')
})

const defaultFormState = {
    name: '',
    phone: '',
    size: 'Medium',
    toppings: {
        pepperoni: false,
        sausage: false,
        bacon: false,
        mushrooms: false,
        pineapple: false,
    },
    instructions: ''
}

const defaultErrorState = {
    name: '',
    phone: ''
}

const PizzaForm = props => {
    const [formState, setFormState] = useState(defaultFormState);
    const [errors, setErrors] = useState(defaultErrorState);
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        schema.isValid(formState).then(valid => setIsDisabled(!valid));
    }, [formState, schema])

    const validate = e => {
        e.persist();
        yup.reach(schema, e.target.name).validate(e.target.value)
            .then(valid => setErrors({ ...errors, [e.target.name]: '' }))
            .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    const handleChange = e => {
        if (e.target.type === 'checkbox') {
            setFormState({
                ...formState,
                toppings: {
                    ...formState.toppings,
                    [e.target.value]: e.target.checked
                }
            })
        } else {
            setFormState({
                ...formState,
                [e.target.name]: e.target.value
            })
        }
        if (e.target.name === 'name' || e.target.name === 'phone') {
            validate(e);
        }
    }

console.log(formState);

    const handleSubmit = e => {
        e.preventDefault();
        console.log('Order Submitted');
        console.log('fromstate:', formState);
        axios.post("https://reqres.in/api/pizza", formState)
        .then(res => {
            props.addOrder(res.data)
            setFormState(defaultFormState);
        }) 
        .catch(err => console.log(err));
    }



    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <label>Name
                <input type='text' name='name' value={formState.name} onChange={handleChange} data-cy='name'></input>
                    {errors.name.length > 0 && <p style={{ color: 'red' }}>{errors.name}</p>}
                </label>
                <label>Phone Number
                <input type='tel' name='phone' value={formState.phone}  onChange={handleChange} data-cy='phone'></input>
                    {errors.phone.length > 0 && <p style={{ color: 'red' }}>{errors.phone}</p>}
                </label>
                <label> Choose a Size
                    <select name='size' onChange={handleChange} defaultValue='Medium'>
                        <option value='Medium'>Medium</option>
                        <option value='Large'>Large</option>
                        <option value='X-Large'>X-Large</option>
                    </select>
                </label>
                <fieldset> Choose Your toppings
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange} checked={formState.toppings.pepperoni} value='pepperoni' data-cy='pepperoni' />
                        Pepperoni
                    </label>
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange}  checked={formState.toppings.sausage} value='sausage' data-cy='sausage' />
                        Sausage
                    </label>
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange}  checked={formState.toppings.mushrooms} value='mushrooms' data-cy='mushrooms' />
                        Mushrooms
                    </label>
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange}  checked={formState.toppings.pineapple} value='pineapple' data-cy='pineapple' />
                        Pineapple
                    </label>
                </fieldset>
                <label>
                    <textarea name='instructions' onChange={handleChange} value={defaultFormState.instructions} placeholder='Special Instructions' data-cy='instructions' />
                </label>
                <button type='submit' disabled={isDisabled} data-cy="submit-button">Add Order</button>
            </form>
            <div className='placed'>
                {props.orders.map((order, i) => <OrderCard key={i} order={order} />)}
            </div>
        </FormContainer>
    );
}

const FormContainer = styled.div`
    margin: 5rem auto;
    max-width: 600px;
    display: flex;
    form {
        display: flex;
        flex-direction: column;
    }
    label{
        display: flex;
        justify-content: space-between;
    }
    .placed{
        padding: 1rem;
        margin: 5rem ;
    }
`

export default PizzaForm;