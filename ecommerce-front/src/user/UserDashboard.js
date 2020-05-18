import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getPurchaseHistory } from "./apiUser";
import moment from "moment";
import CardItem from '@material-ui/core/Card';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
});

const Dashboard = () => {
    const [history, setHistory] = useState([]);
    const classes = useStyles();
    const {
        user: { _id, name, email, role }
    } = isAuthenticated();
    const token = isAuthenticated().token;

    const init = (userId, token) => {
        getPurchaseHistory(userId, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setHistory(data);
            }
        });
    };

    useEffect(() => {
        init(_id, token);
    }, []);

    const userLinks = () => {
        return (
            <div>
                <CardItem style={{height: '300px'}}>
                    <ListItem className="pt-3 pl-3" style={{color: 'black', fontWeight:'bold'}}>User Links</ListItem>
                    <List className="list-group">
                        <ListItem className="list-group-item">
                            <Link className="nav-link" to="/cart" style={{color: 'black'}}>
                                My Cart
                            </Link>
                        </ListItem>
                        <ListItem className="list-group-item">
                            <Link className="nav-link" to={`/profile/${_id}`} style={{color: 'black'}}>
                                Update Profile
                            </Link>
                        </ListItem>
                    </List>
                </CardItem>
            </div>
        );
    };

    const userInfo = () => {
        return (
            <div  className="mb-5">
                <CardItem className={classes.root}>
                    <CardContent>
                        <Typography variant="h5" component="h2" color='primary'>
                            User Information
                        </Typography><hr/>
                        <Typography className={classes.pos} color="textSecondary">
                            Name: {name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Email: {email}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            User type: {role === 1 ? "Admin" : "User"}
                        </Typography>
                    </CardContent>    
                </CardItem>
            </div>
        );
    };

    const purchaseHistory = history => {
        return (
            <CardItem className="mb-5">
                <h5 className="card-header" style={{color:'blue'}}>Purchase history</h5>
                <ul className="list-group">
                    <li className="list-group-item">
                        {history.map((h, i) => {
                            return (
                                <div>
                                    <hr />
                                    {h.products.map((p, i) => {
                                        return (
                                            <div key={i}>
                                                <h6>Product name: {p.name}</h6>
                                                <h6>
                                                    Product price: ${p.price}
                                                </h6>
                                                <h6>
                                                    Purchased date:{" "}
                                                    {moment(
                                                        p.createdAt
                                                    ).fromNow()}
                                                </h6>
                                            </div>
                                        );
                                    })}
                                </div>
                            );
                        })}
                    </li>
                </ul>
            </CardItem>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`G'day ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{userLinks()}</div>
                <div className="col-9">
                    {userInfo()}
                    {purchaseHistory(history)}
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;
