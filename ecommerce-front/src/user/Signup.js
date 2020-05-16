import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { signup } from '../auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const { name, email, password, success, error } = values;

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false });
        signup({ name, email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, success: false });
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                });
            }
        });
    };

    const signUpForm = () => (
        <div className="pl-5 pr-5 pb-5 pt-3 bg-light">
            <form>
                <div className="form-group">
                    <TextField 
                      onChange={handleChange('name')} 
                      type="text"
                      value={name}
                      label="Name"
                      placeholder="Name"
                      style={{width: '100%'}}
                    />
                </div>

                <div className="form-group">
                    <TextField 
                      onChange={handleChange('email')} 
                      type="email"
                      value={email}
                      label="Email"
                      placeholder="Email"
                      style={{width: '100%'}}
                    />
                </div>

                <div className="form-group">
                    <TextField 
                      onChange={handleChange('password')} 
                      type="password" 
                      value={password}
                      placeholder="Password"
                      label="Password"
                      style={{width: '100%'}}
                    />
                </div>
                <div className="text-center">
                    <Button onClick={clickSubmit} variant="outlined" color="primary">
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    );

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
            New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    );

    return (
        <Layout
            title="Sign-Up"
            description="Add new user"
            className="container col-md-6 offset-md-3"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
