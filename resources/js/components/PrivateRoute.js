import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

function PrivateRoute ({component: Component, authenticated, eventChangeAuthentication, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated
          ? <Component {...props} eventChangeAuthentication ={eventChangeAuthentication} />
          : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
      />
    )
  }


  export default PrivateRoute;
  

