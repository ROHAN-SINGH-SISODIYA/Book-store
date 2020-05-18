import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { read, listRelated } from './apiCore';
import Card from './Card';
import CardItem from '@material-ui/core/Card';

const Product = props => {
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const [error, setError] = useState(false);

    const loadSingleProduct = productId => {
        read(productId).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProduct(data);
                // fetch related products
                listRelated(data._id).then(data => {
                    if (data.error) {
                        setError(data.error);
                    } else {
                        setRelatedProduct(data);
                    }
                });
            }
        });
    };

    useEffect(() => {
        const productId = props.match.params.productId;
        loadSingleProduct(productId);
    }, [props]);

    return (
        <Layout
            title='Product-Detail'
            description={product && product.name}
            className="container-fluid"
        >   
            <div>
                <div className="row">
                    <div className="col-sm-8">
                        <CardItem>
                            <div className="row p-3">
                                <div class="col-sm-6">
                                    {product && product.description && <Card product={product} showViewProductButton={false}/>}
                                </div>
                                <div class="col-sm-6 pt-5">
                                    <h5 style={{color:'red'}}>Name: <span style={{color:'black'}}>{product.name} </span></h5>
                                    <h6>Description:</h6> 
                                    <p>{product.description}</p>
                                    <h6>Price: {product.price}</h6>
                                </div>
                            </div>
                        </CardItem>
                    </div>
                    <div className="col-sm-4">
                        <CardItem>
                        <div>
                            <h5 className='text-center pt-2 mb-0 pb-0'>Related products</h5>
                        </div>
                        <div>
                            {relatedProduct.map((p, i) => (
                                <div className="" key={i}>
                                    <Card product={p} />
                                </div>
                            ))}
                        </div>
                        </CardItem>
                    </div>
                </div>
                
            </div>
            {/* <div className="row">
                {/* <div className="col-8">
                    {product && product.description && <Card product={product} showViewProductButton={false} />}
                </div> */}

                {/* <div className="col-4">
                    <h4>Related products</h4>
                    {relatedProduct.map((p, i) => (
                        <div className="mb-3" key={i}>
                            <Card product={p} />
                        </div>
                    ))}
                </div>
            </div> */}
        </Layout>
    );
};

export default Product;
