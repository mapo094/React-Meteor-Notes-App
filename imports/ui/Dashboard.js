import React, { Component } from "react";

import PrivateHeader from './PrivateHeader';

// Statlest function components
export default ()=>{
    return(
        <div>
            <PrivateHeader title="Your links"/>
            <div className="page-content">
            Dashboard page content.
            </div>
        </div>
    )
}