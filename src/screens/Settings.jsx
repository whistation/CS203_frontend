import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function Settings(){
    return(
      <>
        <main>
          <h1>SETTINGS PAGE</h1>
            <p>
              Here users can change their profile picture, name, email, phone number and password. 
            </p>

            <p></p>
        </main>
  
        <nav>
          <Link to="/listingpage"> Back to LISTING PAGE </Link>
        </nav>
      </>
    )
  }