import React, { useState } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { createCategory } from "./apiAdmin";
import SideNav from '../user/SideNav';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/lab';

const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    // destructure user and token from localstorage
    const { user, token } = isAuthenticated();

    const handleChange = e => {
        if(e.target.vale===null || e.target.value==='') {
            console.log("Om:", e.target.value)
            setError("");
        }
        else {
            setName(e.target.value);
        }
    };

    const clickSubmit = e => {
        e.preventDefault();
        
        if(!name) {
            setError("Required");
            setSuccess(false);
            return
        }
        // make request to api to create category
        createCategory(user._id, token, { name }).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setError("");
                setSuccess(true);
            }
        });
    };

    const newCategoryFom = () => (
        <div>
            <div style={{padding: '50px'}}>
                {showError()}
                <div className="mb-3">
                    <TextField
                        type="text"
                        onChange={handleChange}
                        value={name}
                        style={{width: '100%'}}
                        placeholder='Add-Category'
                        label='Category Name'
                        required
                    />
                </div>
                <div className="text-center">
                    <Button variant='outlined' color='primary' onClick={clickSubmit}>Create Category</Button>
                </div>
            </div>
        </div>
    );

    const showSuccess = () => {
        if (success) {
            return (
                <Alert severity="success">
                    <AlertTitle>Success</AlertTitle>
                    <span>{name} Added Successfull!</span>
                </Alert>
            )
        }
    };

    const showError = () => {
        if (error) {
            return <Alert severity="error">Please enter new Category</Alert>
        }
    };

    return (
        <Layout
            title="Add Category"
            description={`Add new Book Category`}
        >
        <div className="row">
            <div className="col-md-3">
                <Card>
                    <SideNav/>
                </Card>
            </div>
            <div className="col-md-9">
                <Card style={{height: '450px'}}>
                    {showSuccess()}
                    {newCategoryFom()}
                </Card>
            </div>
        </div>
            
        </Layout>
    );
};

export default AddCategory;
