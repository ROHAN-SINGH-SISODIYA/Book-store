import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { withRouter } from "react-router-dom";
import { getProducts, deleteProduct } from "./apiAdmin";
import SideNav from '../user/SideNav';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import DeleteRoundedIcon from '@material-ui/icons/DeleteRounded';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

const ManageProducts = ({history}) => {
    const classes = useStyles();
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

    const handleUpdate = (id) => {
        history.push(`/admin/product/update/${id}`)
    }

    const handleDelete = (id) => {
        deleteProduct(id, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                loadProducts();
            }
        });
    }


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
                    <TableContainer component={Paper}>
                        <h5 style={{color: 'blue', textAlign: 'center', paddingTop: '10px'}}>
                            You have {products.length} products
                        </h5>
                        <hr />
                        <div style={{paddingLeft: '5%', paddingRight: '5%', paddingBottom: '5%'}}>

                            <Table className={classes.table} aria-label="simple table">
                                <TableHead style={{backgroundColor: '#F2F2F2'}}>
                                    <TableRow>
                                        <TableCell align="left">Book Name</TableCell>
                                        <TableCell align="center">Update</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {products.map((row) => (
                                    <TableRow key={row._id}>
                                        <TableCell scope="row" align="left">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">
                                            <EditRoundedIcon 
                                                style={{color:'green'}}
                                                onClick={() => handleUpdate(row._id)}
                                            />
                                        </TableCell>
                                        <TableCell align="center">
                                            <DeleteRoundedIcon 
                                                style={{color:'red'}}
                                                onClick={() => handleDelete(row._id)}
                                            />
                                        </TableCell>
                                    </TableRow>
                                ))}
                                </TableBody>
                            </Table>
                        </div>
                        </TableContainer>
                    <br />
                </div>
            </div>
        </Layout>
    );
};

export default withRouter(ManageProducts);
