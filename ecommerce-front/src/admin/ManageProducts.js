import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import SideNav from '../user/SideNav';
import Card from '@material-ui/core/Card';

const ManageProducts = () => {
    const [products, setProducts] = useState([]);

    const { user, token } = isAuthenticated();

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    };

    useEffect(() => {
        loadProducts();
    }, []);

    return (
        <Layout
            title="Manage Products"
            description="Manage your products"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-md-3">
                    <Card>
                        <SideNav/>
                    </Card>
                </div>
                <div className="col-md-9">
                    <Card>
                        <h5 style={{color: 'blue', textAlign: 'center', paddingTop: '10px'}}>
                            You have {products.length} products
                        </h5>
                        <hr />
                        <ul className="list-group">
                            {products.map((p, i) => (
                                <li
                                    key={i}
                                    className="list-group-item d-flex justify-content-between align-items-center"
                                >
                                    <strong>{p.name}</strong>
                                    <Link to={`/admin/product/update/${p._id}`}>
                                        <span className="badge badge-warning badge-pill">
                                            Update
                                        </span>
                                    </Link>
                                    <span
                                        onClick={() => destroy(p._id)}
                                        className="badge badge-danger badge-pill"
                                    >
                                        Delete
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <br />
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default ManageProducts;
