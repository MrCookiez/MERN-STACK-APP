import React, { useState } from 'react'
import {Link} from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = async e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();

        if (password !== password2) {
            console.log('Passwords do not much')
        } else {
            console.error('Success');
        }
    };

    return (
        <>
           <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} action="create-profile.html">
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        value={name}
                        type="text"
                        placeholder="Name"
                        name="name"
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        name="email"
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        required
                    />
                <small
                    className="form-text"
                >
                    This site uses Gravatar so if you want a profile image, use a
                    Gravatar email
                </small>
                </div>
                <div className="form-group">
                <input
                    onChange={e => onChange(e)}
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    minLength="6"
                    required
                />
                </div>
                <div className="form-group">
                <input
                    onChange={e => onChange(e)}
                    name="password2"
                    value={password2}
                    type="password"
                    placeholder="Confirm Password"
                    minLength="6"
                    required
                />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
            </section>
        </>
    );
};

export default Register;
