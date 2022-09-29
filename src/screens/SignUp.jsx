import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function SignUp() {
    return (
      <>
        <main>
          <h1>SIGN UP</h1>
          <p>
            New users, please sign up here!
          </p>
        </main>
        <nav>
          <Link to="/">Back to HOME</Link>
        </nav>
      </>
    );
  }