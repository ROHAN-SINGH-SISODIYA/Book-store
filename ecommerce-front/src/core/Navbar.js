import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Tooltip from '@material-ui/core/Tooltip';
import ShopIcon from '@material-ui/icons/Shop';
import HomeIcon from '@material-ui/icons/Home';
import DashboardIcon from '@material-ui/icons/Dashboard';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import KeyboardReturnIcon from '@material-ui/icons/KeyboardReturn';
import InputRoundedIcon from '@material-ui/icons/InputRounded';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  linkCss: {
    "&:hover": {
        color: '#ffffff',
        underline: 'none'
    },
    color: '#ffffff',
    marginRight: theme.spacing(4),
    underline: 'none'
  },
}));
 
export const Navbar = ({ history }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  }
  const handleHome = () => {
    history.push('/')
  }

  const handleShop = () => {
    history.push('/shop');
  }

  const handleUserDashboard = () => {
      history.push('/user/dashboard')
  }

  const handleAdminDashboard = () => {
    history.push('/admin/dashboard')
  }

  const handleCart = () => {
      history.push('/cart')
  }

  const handleSignUp = () => {
      history.push('/signup')
      setAnchorEl(null);
  }

  const handleSignIn = () => {
      history.push('/signin')
      setAnchorEl(null);
  }

  const handleSignOut = () => {
    signout(() => {
        history.push("/");
        setAnchorEl(null);
    })
  }

  return (
    <div className={classes.root}>
      <AppBar position="sticky">
        <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <LocalLibraryIcon onClick={handleHome} />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
                Online Book Store
            </Typography>
            <div>
                <Tooltip title="Home">
                    <IconButton aria-label="Home" color='inherit'>
                        <HomeIcon onClick={handleHome} />
                    </IconButton>
                </Tooltip>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <Tooltip title="Dashboard">
                        <IconButton aria-label="dashboard" color='inherit'>
                            <DashboardIcon onClick={handleUserDashboard} />
                        </IconButton>
                    </Tooltip>
                )}
                
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <Tooltip title="Dashboard">
                        <IconButton aria-label="dashboard" color='inherit'>
                            <DashboardIcon onClick={handleAdminDashboard} />
                        </IconButton>
                    </Tooltip>
                )}

                <Tooltip title="Shop">
                    <IconButton aria-label="Shop" color='inherit'>
                        <ShopIcon onClick={handleShop} />
                    </IconButton>
                </Tooltip>
                
                <Tooltip title="Cart">
                    <IconButton aria-label="cart" color='inherit'>
                        <ShoppingCartIcon onClick={handleCart}/><i style={{fontSize: "15px"}}>{itemTotal()}</i>    
                    </IconButton>
                </Tooltip>
                <Tooltip title="User">
                    <IconButton
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        {!isAuthenticated() && ( <MenuIcon/> )}
                        {isAuthenticated() && ( <AccountCircle /> )}
                    </IconButton>
                </Tooltip>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={handleClose}
                >
                    {!isAuthenticated() && ( <MenuItem onClick={handleSignIn}><InputRoundedIcon/>Sign-In</MenuItem> )}
                    {!isAuthenticated() && ( <MenuItem onClick={handleSignUp}><AddCircleOutlineOutlinedIcon/>Sign-Up</MenuItem> )}
                    {isAuthenticated() && ( <MenuItem onClick={handleSignOut}><KeyboardReturnIcon/> Signout</MenuItem> )}
                </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Navbar)