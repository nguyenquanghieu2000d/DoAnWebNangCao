import {CircularProgress} from "@material-ui/core";
import React from "react";
import Box from "@material-ui/core/Box";

export default function Loading() {
    return (
        <Box style={{height: '100%', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress/>
        </Box>);
}

