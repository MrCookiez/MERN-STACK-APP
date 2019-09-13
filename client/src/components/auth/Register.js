import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

const Register = ({ setAlert, register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();

        if (password !== password2) {
            setAlert('Passwords do not much', 'danger');
        } else {
            register({ name, email, password });
        }
    };

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

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
                        // required
                    />
                </div>
                <div className="form-group">
                    <input
                        onChange={e => onChange(e)}
                        name="email"
                        value={email}
                        type="email"
                        placeholder="Email Address"
                        // required
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
                    // minLength="6"
                    // required
                />
                </div>
                <div className="form-group">
                <input
                    onChange={e => onChange(e)}
                    name="password2"
                    value={password2}
                    type="password"
                    placeholder="Confirm Password"
                    // minLength="6"
                    // required
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

Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
