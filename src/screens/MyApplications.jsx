import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function MyApplications(){
    return(
      <>
        <main>
          <h1>MY APPLICATIONS PAGE</h1>
            <p>
              Here users can see all the listings they have applied for, and withdraw their application
            </p>

            <button>withdraw the application</button>
            <p></p>
        </main>
  
        <nav>
          <Link to="/listingpage"> Back to LISTING PAGE </Link>
        </nav>
      </>
    )
  }