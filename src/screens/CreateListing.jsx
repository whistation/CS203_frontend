import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function CreateListing() {
    return (
      <>
        <main>
          <h1>ENTER LISTING DETAILS</h1>
  
          <p>This is where project creators can create a new listing by entering project title, project description, and upload a photo of the project</p>
        </main>
  
        <nav>
          <Link to="/listingpage/mylistings"> Back to MY LISTINGS </Link>
        </nav>
      </>
    );
  }