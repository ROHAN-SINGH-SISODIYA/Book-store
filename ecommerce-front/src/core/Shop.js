import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./Checkbox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import CardItem from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const Shop = () => {
    const [myFilters, setMyFilters] = useState({
        filters: { category: [], price: [] }
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(false);
    const [limit, setLimit] = useState(6);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(0);
    const [filteredResults, setFilteredResults] = useState([]);

    const init = () => {
        getCategories().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setCategories(data);
            }
        });
    };

    const loadFilteredResults = newFilters => {
        // console.log(newFilters);
        getFilteredProducts(skip, limit, newFilters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults(data.data);
                setSize(data.size);
                setSkip(0);
            }
        });
    };

    const loadMore = () => {
        let toSkip = skip + limit;
        // console.log(newFilters);
        getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setFilteredResults([...filteredResults, ...data.data]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 &&
            size >= limit && (
                <div className="pl-3 pb-3">
                    <Button onClick={loadMore} variant='outlined' color='primary'>
                        Load more
                    </Button>
                </div>
            )
        );
    };

    useEffect(() => {
        init();
        loadFilteredResults(skip, limit, myFilters.filters);
    }, []);

    const handleFilters = (filters, filterBy) => {
        // console.log("SHOP", filters, filterBy);
        const newFilters = { ...myFilters };
        newFilters.filters[filterBy] = filters;

        if (filterBy === "price") {
            let priceValues = handlePrice(filters);
            newFilters.filters[filterBy] = priceValues;
        }
        loadFilteredResults(myFilters.filters);
        setMyFilters(newFilters);
    };

    const handlePrice = value => {
        const data = prices;
        let array = [];

        for (let key in data) {
            if (data[key]._id === parseInt(value)) {
                array = data[key].array;
            }
        }
        return array;
    };

    return (
        <Layout
            title="Books-Store"
            description="Find your best choice"
            className="container-fluid"
        >
            <div className="row">
                <div className="col-sm-2">
                    <CardItem>
                        <div>
                            <h6 className="pt-2 pl-2 pr-2">Filter by categories</h6>
                            <ul>
                                <Checkbox
                                    categories={categories}
                                    handleFilters={filters =>
                                        handleFilters(filters, "category")
                                    }
                                />
                            </ul>
                        </div>
                        <div>
                            <h6 className="pt-2 pl-2 pr-2">Filter by price</h6>
                            <div className='mb-3'>
                                <RadioBox
                                    prices={prices}
                                    handleFilters={filters =>
                                        handleFilters(filters, "price")
                                    }
                                />
                            </div>
                        </div>
                    </CardItem>
                </div>
                <div className="col-sm-10">
                    <CardItem>
                        <h4 className="text-center pt-2" style={{color: 'blue'}}>Products</h4><hr/>
                        <div className="row">
                            {filteredResults.map((product, i) => (
                                <div key={i} className="col-4 mb-3">
                                    <Card product={product} />
                                </div>
                            ))}
                        </div>
                        <hr />
                        {loadMoreButton()}
                    </CardItem>
                </div>
            </div>
        </Layout>
    );
};

export default Shop;
