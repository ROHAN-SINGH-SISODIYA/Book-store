import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddAPhotoIcon from '@material-ui/icons/AddAPhoto';
import DraftsIcon from '@material-ui/icons/Drafts';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export function SimpleList({history}) {
  const classes = useStyles();

  const handleCategory = () => {
    history.push('/create/category')
  }
  
  const handleProduct = () => {
    history.push('/create/product')
  }
  
  const handleViewOrder = () => {
    history.push('/admin/orders')
  }
  
  const handleManageProduct = () => {
    history.push('/admin/products')
  }

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders" style={{backgroundColor: 'light', height: '450px'}}>
        <ListItem button>
          <ListItemIcon>
            <AddCircleOutlineIcon onClick={handleCategory} />
          </ListItemIcon>
          <ListItemText primary="Add Category" onClick={handleCategory} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AddAPhotoIcon onClick={handleProduct} />
          </ListItemIcon>
          <ListItemText primary="Add Product" onClick={handleProduct} />
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <PageviewIcon onClick={handleViewOrder}/>
          </ListItemIcon>
          <ListItemText primary="View Order"  onClick={handleViewOrder}/>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <AssignmentTurnedInIcon onClick={handleManageProduct} />
          </ListItemIcon>
          <ListItemText primary="Manage Product" onClick={handleManageProduct} />
        </ListItem>
      </List>
    </div>
  );
}

export default withRouter(SimpleList)