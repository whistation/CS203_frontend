import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function ListingPage(){
    return(
      <>
        <main>
          <h1>LISTING PAGE</h1>
            <p>
              Here users can see all listings, search all listings, access settings, access their applications, access their listings, and contact us.
            </p>
        </main>
  
        <nav>
          <Link to="/"> Logout </Link>
          <p>
          </p>

          <button>
            <Link to="/listingpage/projectpage">Click on a project</Link>
          </button>
          <p></p>
          <button>
            <Link to="/listingpage/settings">Go to settings</Link>
          </button>
          <p></p>
          <button>
            <Link to="/listingpage/myapplications">View your applications</Link>
          </button>
          <p></p>
          <button>
            <Link to="/listingpage/mylistings">View your listings</Link>
          </button>

        </nav>
      </>
    )
  }