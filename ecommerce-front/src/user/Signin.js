import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import Layout from "../core/Layout";
import { signin, authenticate, isAuthenticated } from "../auth";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Signin = () => {
    const [values, setValues] = useState({
        email: "",
        password: "",
        error: "",
        loading: false,
        redirectToReferrer: false
    });

    const { email, password, loading, error, redirectToReferrer } = values;
    const { user } = isAuthenticated();

    const handleChange = name => event => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        signin({ email, password }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer: true
                    });
                });
            }
        });
    };

    const signUpForm = () => (
        <div className='p-5' style={{ backgroundColor: '#F2F2F2'}}>
            <form>
                <div className="form-group">
                    <TextField
                        onChange={handleChange("email")}
                        type="email"
                        placeholder="Username"
                        value={email}
                        label="Username"
                        style={{width: '100%'}}
                    />
                </div>

                <div className="form-group">
                    <TextField
                        onChange={handleChange("password")}
                        type="password"
                        placeholder="Password"
                        value={password}
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
        <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
        >
            {error}
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-info">
                <h2>Loading...</h2>
            </div>
        );

    const redirectUser = () => {
        if (redirectToReferrer) {
            if (user && user.role === 1) {
                return <Redirect to="/admin/dashboard" />;
            } else {
                return <Redirect to="/user/dashboard" />;
            }
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout
            title="Sign-In"
            description=""
            className="container col-md-6 offset-md-3"
        >
            {showLoading()}
            {showError()}
            {signUpForm()}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
