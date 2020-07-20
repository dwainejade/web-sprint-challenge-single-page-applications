import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import styled from 'styled-components';
import axios from 'axios';

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
    size: {
        medium: false,
        large: false,
        xlarge: false
    },
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


    const handleSubmit = e => {
        e.preventDefault();
        console.log(formState);
        axios.post("https://reqres.in/api/pizza", formState)
            .then(res => props.addOrder(res.data))
            .catch(err => console.log(err));
    }

    return (
        <FormContainer>
            <form onSubmit={handleSubmit}>
                <label>Name
                <input type='text' name='name' onChange={handleChange} data-cy='name'></input>
                    {errors.name.length > 0 && <p style={{ color: 'red' }}>{errors.name}</p>}
                </label>
                <label>Phone Number
                <input type='tel' name='phone' onChange={handleChange} data-cy='phone'></input>
                    {errors.phone.length > 0 && <p style={{ color: 'red' }}>{errors.phone}</p>}
                </label>
                <label> Choose a Size
                    <select name='size' onChange={handleChange} defaultValue='large'>
                        <option value='medium'>Medium</option>
                        <option value='large'>Large</option>
                        <option value='x-large'>X-Large</option>
                    </select>
                </label>
                <fieldset> Choose Your toppings
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange} value='pepperoni' data-cy='pepperoni' />
                        Pepperoni
                    </label>
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange} value='sausage' data-cy='sausage' />
                        Sausage
                    </label>
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange} value='mushrooms' data-cy='mushrooms' />
                        Mushrooms
                    </label>
                    <label>
                        <input type='checkbox' name='toppings' onChange={handleChange} value='pineapple' data-cy='pineapple' />
                        Pineapple
                    </label>
                </fieldset>
                <label>
                    <textarea name='instructions' onChange={handleChange} placeholder='Special Instructions' data-cy='instructions' />
                </label>
                <button type='submit' disabled={isDisabled} data-cy="submit-button">Place Order</button>
            </form>
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
`

export default PizzaForm;