import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin';
import SideNav from '../user/SideNav';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';


const AddProduct = () => {
    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = values;

    // load categories and set form data
    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        createProduct(user._id, token, formData).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3 pl-5 pr-5 pb-5 pt-2" onSubmit={clickSubmit}>
            <h4 style={{color: 'blue'}}>Add Product Detail</h4>
            <hr/>
            {showLoading()}
            {showSuccess()}
            {showError()}
            <div className="mb-2">
                <TextField 
                    onChange={handleChange('photo')} 
                    type="file" 
                    name="photo" 
                    accept="image/*"
                    style={{width: '100%'}}
                    label="Book Image"
                    placeholder="Book Image"
                />
            </div>

            <div className="mb-2">
                <TextField 
                  onChange={handleChange('name')} 
                  type="text" 
                  value={name} 
                  label="Name of Book"
                  placeholder="Name of Book"
                  style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
               <TextField 
                    onChange={handleChange('description')} 
                    value={description}
                    label="Discription*"
                    placeholder="Discription"
                    style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
                <TextField 
                    onChange={handleChange('price')} 
                    type="number"
                    value={price}
                    label="Price*"
                    placeholder="Price"
                    style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
                <label className='text-secondary'>Category</label>
                <Select 
                    onChange={handleChange('category')}
                    style={{width: '100%'}}
                >
                    <MenuItem>Book Category</MenuItem>
                    {categories &&
                        categories.map((c, i) => (
                            <MenuItem key={i} value={c._id}>
                                {c.name}
                            </MenuItem>
                        ))}
                </Select>
            </div>

            <div className="mb-2">
                <label className='text-secondary'>For Shipping</label>
                <Select 
                    onChange={handleChange('shipping')}
                    style={{width: '100%'}}
                >
                    <MenuItem>For Shipping</MenuItem>
                    <MenuItem value="0">No</MenuItem>
                    <MenuItem value="1">Yes</MenuItem>
                </Select>
            </div>

            <div className="mb-2">
                <TextField 
                    onChange={handleChange('quantity')} 
                    type="number"
                    value={quantity}
                    placeholder='Quantity'
                    label='Quantity'
                    style={{width: '100%'}}
                />
            </div>

            <button className="btn btn-outline-primary">Create Product</button>
        </form>
    );

    const showError = () => (
        <Alert severity="error"  style={{ display: error ? '' : 'none' }} className='mb-2'>{error}</Alert>
    );

    const showSuccess = () => (
        <Alert severity="success" className='mb-2' style={{ display: createdProduct ? '' : 'none' }}>
            <AlertTitle>Success</AlertTitle>
            <span>{createdProduct} is created Successfull!</span>
        </Alert>
    );

    const showLoading = () =>
        loading && (
            <LinearProgress/>
        );

    return (
        <Layout title="Add new product" description={`Add new product to list`}>
            <div className="row">
                <div className="col-md-3">
                    <Card>
                        <SideNav/>
                    </Card>
                </div>
                <div className="col-md-9">
                    <Card>
                        {newPostForm()}
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default AddProduct;
