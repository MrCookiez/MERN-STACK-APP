import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = async e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        login(email, password);
    };

    // Redirect if logged in
    if(isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <>
           <section className="container">
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Sign in your Account</p>
            <form className="form" onSubmit={e => onSubmit(e)} action="create-profile.html">
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        name="email"
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        required
                    />
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
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account yet? <Link to='/register'>Sign up</Link>
            </p>
            </section>
        </>
    );
};

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {login})(Login);
