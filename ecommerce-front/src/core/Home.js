import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import Card from './Card';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);

    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        <Layout
            title="Home"
            description=""
            className="container-fluid"
        >
            <Search />
            <h3 
              style={{
                backgroundColor:"#ECF0F1", 
                textAlign: 'center', 
                color: 'blue', 
                padding: '10px', 
                marginBottom: '10px', 
                fontFamily: '"Gill Sans", sans-serif'
              }}
            >
              New Arrivals
            </h3>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>

            <h3 
              style={{
                backgroundColor:"#ECF0F1", 
                textAlign: 'center', 
                color: 'blue', 
                padding: '10px', 
                marginBottom: '10px', 
                fontFamily: '"Gill Sans", sans-serif'
              }}
            >
                Best Sellers
            </h3>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-4 mb-3">
                        <Card product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
