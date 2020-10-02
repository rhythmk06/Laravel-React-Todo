import React from "react";
import {BrowserRouter, Route, Redirect} from "react-router-dom";

function GuestRoute ({component: Component, authenticated, eventChangeAuthentication, ...rest}) {
    return (
      <Route
        {...rest}
        render={(props) => authenticated
            ? <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />
            : <Component {...props} eventChangeAuthentication ={eventChangeAuthentication} />}
      />
    )
  }


  export default GuestRoute;
  

