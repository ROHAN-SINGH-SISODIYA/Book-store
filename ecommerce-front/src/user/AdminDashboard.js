import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import SideNav from './SideNav'

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


const AdminDashboard = () => {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    const {
        user: { name, email, role }
    } = isAuthenticated();

    const adminLinks = () => {
        return (
            <Card className={classes.root}>
                 <SideNav/>
            </Card>
        );
    };

    const adminInfo = () => {
        return (
            <div>
                <Card className={classes.root}>
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
                </Card>
            </div>
        );
    };

    return (
        <Layout
            title="Dashboard"
            description={`Hii! ${name}!`}
            className="container-fluid"
        >
            <div className="row">
                <div className="col-3">{adminLinks()}</div>
                <div className="col-9">{adminInfo()}</div>
            </div>
        </Layout>
    );
};

export default AdminDashboard;
