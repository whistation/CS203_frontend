import * as React from "react";
import {Link} from "react-router-dom";
import "./General.css";

export default function Home() {
    return (
      <>
        <main>
          <h1>HOME PAGE</h1>
  
          <h2>It is the landing page where users can log in, sign up, and see our socials.</h2>
          <p>You can do this, I believe in you.</p>
        </main>
        <nav>
          <Link to="/SignUp">Sign Up Page</Link>
          <p></p>
          <Link to="/Login">Log in Page</Link>
        </nav>
      </>
    );
  }