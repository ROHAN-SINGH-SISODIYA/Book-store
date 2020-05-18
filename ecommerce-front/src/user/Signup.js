import React, { useState } from 'react';
import Layout from '../core/Layout';
import { signup } from '../auth';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Alert, AlertTitle } from '@material-ui/lab';

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
        <Alert severity="error" className='mb-2'>{error}</Alert>
    );

    const showSuccess = () => (
        <Alert severity="success" className='mb-2' style={{ display: success ? '' : 'none' }}>
            <AlertTitle>Success</AlertTitle>
            <span>User created Successfull!</span>
        </Alert>
    );

    return (
        <Layout
            title="Sign-Up"
            description="Add new user"
            className="container col-md-6 offset-md-3"
        >
            {showSuccess()}
            {error && (showError())}
            {signUpForm()}
        </Layout>
    );
};

export default Signup;
