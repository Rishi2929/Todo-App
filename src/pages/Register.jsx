import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { server } from '../main'

function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(name, email, password)
        await axios.post(`${server}/users/new`, {
            name, email, password
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        })
    }
    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='Name' required />
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Email' required />
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Password' required />
                    <button type='submit'>Sign Up</button>
                    <h4>Or</h4>
                    <Link to="/login">Login</Link>

                </form>
            </section>

        </div>
    )
}

export default Register