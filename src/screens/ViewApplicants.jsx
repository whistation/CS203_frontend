import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function ViewApplicants() {
    return (
      <>
        <main>
          <h1>LISTING PREVIEW + VIEW CURRENT APPLICANTS</h1>
  
          <p>
            Project creators can preview how their listing will look like, edit the listing they created, and view the current applicants of the listing.
          </p>
          <p>
            Contact details of the applicants will be provided for project creators to contact them on their own. 
          </p>
        </main>
  
        <nav>
          <Link to="/listingpage/mylistings"> Back to MY LISTINGS </Link>
        </nav>
      </>
    );
  }