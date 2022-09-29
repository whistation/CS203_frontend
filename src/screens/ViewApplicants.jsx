import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function ViewApplicants() {
    return (
      <>
        <main>
          <h1>LISTING PREVIEW + VIEW CURRENT APPLICANTS</h1>
  
          <p>Project creators can preview how their listing will look like, and view the current applicants of the listing.</p>
        </main>
  
        <nav>
          <Link to="/listingpage/mylistings"> Back to MY LISTINGS </Link>
        </nav>
      </>
    );
  }