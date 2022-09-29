import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function Login(){
    return(
      <>
        <main>
          <h1>LOG IN</h1>
            <p>
              New users, please log in here!
            </p>
        </main>
  
        <nav>
          <Link to="/"> Back to HOME </Link>
          <p></p>
          <Link to="/listingpage"> Log in, proceed to LISTING PAGE </Link>
        </nav>
      </>
    )
  }