import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function MyListings(){
    return(
      <>
        <main>
          <h1>MY LISTINGS PAGE</h1>
            <p>
              Here users can see all the projects that they have created. 
            </p>

            <button>
              <nav>
                <Link to="/listingpage/viewapplicants"> Click on a listing you created </Link>
              </nav>
            </button>
            <p></p>
            <button>
              <nav>
                <Link to="/listingpage/createlisting"> Create a new listing </Link>
              </nav>
            </button>
        </main>
        <p></p>
        <nav>
          <Link to="/listingpage"> Back to LISTING PAGE </Link>
        </nav>
      </>
    )
  }