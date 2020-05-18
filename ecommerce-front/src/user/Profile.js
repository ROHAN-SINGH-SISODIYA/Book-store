import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link, Redirect } from 'react-router-dom';
import { read, update, updateUser } from './apiUser';
import CardItem from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import { Alert, AlertTitle } from '@material-ui/lab';

const Profile = ({ match }) => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    });

    const { token } = isAuthenticated();
    const { name, email, password, error, success } = values;

    const init = userId => {
        // console.log(userId);
        read(userId, token).then(data => {
            if (data.error) {
                setValues({ ...values, error: true });
            } else {
                setValues({ ...values, name: data.name, email: data.email });
            }
        });
    };

    useEffect(() => {
        init(match.params.userId);
    }, []);

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, { name, email, password }).then(data => {
            if (data.error) {
                // console.log(data.error);
                alert(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        success: true
                    });
                });
            }
        });
    };

    const redirectUser = success => {
        if (success) {
            return (
                <Alert severity="success" className='mb-2' style={{ display: success ? '' : 'none' }}>
                    <AlertTitle>Success</AlertTitle>
                    <span>User created Successfull!</span>
                </Alert>
            )
        }
    };

    const profileUpdate = (name, email, password) => (
        <div className="p-4">
            <form>
                <div className="form-group">
                    <TextField 
                        type="text" 
                        onChange={handleChange('name')} 
                        value={name}
                        placeholder="Name"
                        label="Name"
                        style={{width: '100%'}}
                    />
                </div>
                <div className="form-group">
                    <TextField 
                        type="email" 
                        onChange={handleChange('email')} 
                        value={email} 
                        placeholder="Email"
                        label="Email"
                        style={{width: '100%'}}
                    />
                </div>
                <div className="form-group">
                    <TextField 
                        type="password" 
                        onChange={handleChange('password')} 
                        value={password}
                        placeholder="Password"
                        label="Password"
                        style={{width: '100%'}}
                    />
                </div>

                <button onClick={clickSubmit} className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
       
    );

    return (
        <Layout title="Profile" description="Update your profile" className="container-fluid">
            <CardItem className="p-4">
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6">
                        <h4 className="mb-4 text-center" style={{color: 'blue'}}>Profile update</h4><hr/>
                        {redirectUser(success)}
                        {profileUpdate(name, email, password)}
                    </div>
                </div>
            </CardItem>
        </Layout>
    );
};

export default Profile;
