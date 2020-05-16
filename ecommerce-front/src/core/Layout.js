import React from "react";
import "../styles.css";
import Navbar from "./Navbar";
import Box from '@material-ui/core/Box';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Navbar/>
        <Box>
            <div className="col-sm-12 col-md-12 col-lg-12 col-xm-12">
                <Box borderBottom={1} className="p-3 mb-5" >
                    <div className="row" borderBottom={1}>
                        <DoubleArrowIcon/>
                        <span style={{color: 'blue', fontWeight: 'bold'}}>
                            {title}
                        </span> 
                        <DoubleArrowIcon/> 
                        <span style={{color: 'blue', fontWeight: 'bold'}}>
                            {description}
                        </span>
                    </div>
                </Box>
                <div className={className}>{children}</div>
            </div>
        </Box>
    </div>
);

export default Layout;
