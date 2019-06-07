import React from 'react';
import ReactDOM from "react-dom";
import { withRouter } from "react-router";


// css files
import '../cs/index.css';
// import './css/modal.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './css/menu.css'
// import '../cs/login.css'

// routes
import AppRoutes from './AppRoutes.js';


ReactDOM.render(
        <AppRoutes/>
    ,
    document.getElementById("app")
);