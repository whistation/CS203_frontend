import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function MyListings(){
    return(
      <>
        <main>
          <h1>MY LISTINGS PAGE</h1>
            <p>
              Here users can see a picture of the project, project title, project description, and apply for the project
            </p>

            <button>
              <nav>
                <Link to="/listingpage/viewapplicants"> Click on a listing you created </Link>
              </nav>
            </button>
            <p></p>
            <button>
              <nav>
                <Link to="/listingpage/createlisting"> Create a listing </Link>
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