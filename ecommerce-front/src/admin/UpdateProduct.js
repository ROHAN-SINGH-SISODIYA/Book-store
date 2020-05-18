import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { getProduct, getCategories, updateProduct } from './apiAdmin';
import Card from '@material-ui/core/Card';
import { Alert, AlertTitle } from '@material-ui/lab';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import LinearProgress from '@material-ui/core/LinearProgress';
import SideNav from '../user/SideNav'

const UpdateProduct = ({ match }) => {
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
        error: false,
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    });
    const [categories, setCategories] = useState([]);

    const { user, token } = isAuthenticated();
    const {
        name,
        description,
        price,
        // categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        formData
    } = values;

    const init = productId => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                // populate the state
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    shipping: data.shipping,
                    quantity: data.quantity,
                    formData: new FormData()
                });
                // load categories
                initCategories();
            }
        });
    };

    // load categories and set form data
    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setCategories(data);
            }
        });
    };

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'photo' ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });

        updateProduct(match.params.productId, user._id, token, formData).then(data => {
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
                    error: false,
                    redirectToProfile: true,
                    createdProduct: data.name
                });
            }
        });
    };

    const newPostForm = () => (
        <form className="mb-3 pl-5 pr-5 pb-5 pt-2" onSubmit={clickSubmit}>
            <h4 style={{color: 'blue'}}>Update Product</h4><hr/>
            {showLoading()}
            {showSuccess()}
            {showError()}
            <div className="mb-2">
                <TextField 
                    onChange={handleChange('photo')} 
                    type="file" 
                    name="photo" 
                    accept="image/*"
                    label="Update Image"
                    style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
                <TextField 
                    onChange={handleChange('name')} 
                    type="text" 
                    value={name}
                    label="Update Book Name"
                    placeholder="Book name"
                    style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
                <TextField 
                    onChange={handleChange('description')} 
                    value={description}
                    label="Discription"
                    placeholder="Discription"
                    style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
                <TextField 
                    onChange={handleChange('price')} 
                    type="number" 
                    value={price}
                    label="Price"
                    placeholder="Price"
                    style={{width: '100%'}}
                />
            </div>

            <div className="mb-2">
                <label className="text-muted">Category</label>
                <Select 
                    onChange={handleChange('category')}
                    style={{width: '100%'}}
                    value={category}
                >
                    <MenuItem>Please select</MenuItem>
                    {categories &&
                        categories.map((c, i) => (
                            <MenuItem key={i} value={c._id}>
                                {c.name}
                            </MenuItem>
                        ))}
                </Select>
            </div>

            <div className="mb-2">
                <label className="text-muted">Shipping</label>
                <Select 
                    onChange={handleChange('shipping')}
                    style={{width: '100%'}}
                    value={shipping}
                >
                    <MenuItem>Please select</MenuItem>
                    <MenuItem value="false">No</MenuItem>
                    <MenuItem value="true">Yes</MenuItem>
                </Select>
            </div>

            <div className="mb-2">
                <TextField 
                    onChange={handleChange('quantity')} 
                    type="number" 
                    label="Quantity"
                    value={quantity}
                    placeholder="Placeholder"
                    style={{width: '100%'}}
                />
            </div>

            <button className="btn btn-outline-primary">Update Product</button>
        </form>
    );

    const showError = () => (
        <Alert severity="error"  style={{ display: error ? '' : 'none' }} className='mb-2'>{error}</Alert>
    );

    const showSuccess = () => (
        <Alert severity="success" className='mb-2' style={{ display: createdProduct ? '' : 'none' }}>
            <AlertTitle>Success</AlertTitle>
            <span>{createdProduct} is Updated Successfull!</span>
        </Alert>
    );

    const showLoading = () =>
        loading && (
            <LinearProgress/>
        );

    return (
        <Layout title="Add a new product" description={`G'day ${user.name}, ready to add a new product?`}>
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

export default UpdateProduct;
