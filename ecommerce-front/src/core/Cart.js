import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import Card from './Card';
import Checkout from './Checkout';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button'
import CardItem from '@material-ui/core/Card';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h5
                    style={{color: 'blue'}}
                    className='pt-2 text-center'
                >
                    Cart items: {`${items.length}`}
                </h5>
                <hr />
                <div className="pt-2 pl-5 pr-5 pb-5">
                    {items.map((product, i) => (
                        <Card
                            key={i}
                            product={product}
                            showAddToCartButton={false}
                            cartUpdate={true}
                            showRemoveProductButton={true}
                            setRun={setRun}
                            run={run}
                        />
                    ))}
                </div>
            </div>
        );
    };

    const noItemsMessage = () => (
        <h5
            style={{color: 'blue'}}
            className='pt-2 text-center'
        >
            Add item to see! <br/><Link to="/shop">Continue shopping</Link>
        </h5>
    );

    return (
        <Layout
            title="Cart"
            description="Shopping-cart"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-sm-4">
                    <CardItem>
                        {items.length > 0 ? showItems(items) : noItemsMessage()}
                    </CardItem>
                </div>
                <div className="col-sm-8">
                    <CardItem>
                        <h5
                            style={{color: 'blue'}}
                            className='pt-2 text-center'
                        >
                            Your cart summary
                        </h5>
                        <hr />
                        <div className="pl-4 pr-4 pb-4 pt-0 mt-0">
                            <Box color="text.primary" clone>
                                <Button />
                            </Box>
                            <Checkout products={items} setRun={setRun} run={run} />
                        </div>
                    </CardItem>
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
