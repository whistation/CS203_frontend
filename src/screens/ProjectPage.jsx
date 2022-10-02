import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function ProjectPage(){
    return(
      <>
        <main>
          <h1>PROJECT PAGE</h1>
            <p>
              Here users can see a picture of the project, project title, project description, and apply for the project
            </p>

            <button>Apply for a project</button>
            <p></p>
        </main>
  
        <nav>
          <Link to="/listingpage"> Back to LISTING PAGE </Link>
        </nav>
      </>
    )
  }