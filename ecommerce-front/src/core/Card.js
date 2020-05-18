import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { Link, Redirect } from 'react-router-dom';
import { API } from "../config";


const useStyles = makeStyles({
  root: {
    maxWidth: 340,
    maxHeight: 445,
    marginBottom: '5px'
  },
});

export function ImgMediaCard(
  {
    product, showViewProductButton = true, 
    showAddToCartButton = true, 
    cartUpdate = false, 
    showRemoveProductButton = false, 
    setRun = f => f,
    run = undefined,
    history
  }
) {
  const classes = useStyles();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock </span>
    ) : (
      <span className="badge badge-primary badge-pill">Out of Stock </span>
    );
  };

  const handleView = (id) => {
    history.push(`/product/${id}`)
  }
  const addToCart = () => {
    addItem(product, setRedirect(true));
  };

  return (
    <div style={{padding: "5%"}}>
      <Card className={classes.root}>
        <CardActionArea style={{paddingTop: "5%", paddingLeft:"5%", paddingRight:'5%', paddingBottom: '0px'}}>
          <CardMedia
            component="img"
            alt="Contemplative Reptile"
            height="240"
            image={`${API}/product/photo/${product._id}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{fontWeight:'bold'}}>{product.name}</span><br/>
              {product.description.substring(0, 50)}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{color: 'green'}}>Price: </span>
              <span style={{color: 'black'}}>
                $ {product.price}
              </span>
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              <span style={{color: 'blue'}}>Category: </span>
              <span style={{color: 'black'}}>
                {product.category && product.category.name} <i style={{marginLeft:"10%"}}>{showStock(product.quantity)}</i>
              </span>
              <div className="mt-1">
                <Button 
                  size="small"
                  variant="outlined" 
                  color="primary"
                  onClick={() => handleView(product._id)}
                  className='mr-2'
                >
                  View
                </Button>
                {showAddToCartButton && (
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    onClick={() => addToCart()}
                  >
                    Add to cart
                  </Button>
                )}
                {showRemoveProductButton && (
                  <Button 
                    size="small" 
                    variant="outlined" 
                    color="primary"
                    onClick={() => {
                      removeItem(product._id);
                      setRun(!run);
                    }}
                  >
                    Remove
                  </Button>
                )}
                
              </div>
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}

export default withRouter(ImgMediaCard)
