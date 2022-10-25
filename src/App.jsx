import * as React from "react";
import { Routes, Route} from "react-router-dom";
import "./App.css";
import Home from "./screens/Home.jsx"
import SignUp from "./screens/SignUp.jsx"
import Login from "./screens/Login.jsx"
import ListingPage from "./screens/ListingPage.jsx";
import ProjectPage from "./screens/ProjectPage.jsx";
import Settings from "./screens/Settings.jsx";
import MyApplications from "./screens/MyApplications";
import MyListings from "./screens/MyListings";
import CreateListing from "./screens/CreateListing";
import ViewApplicants from "./screens/ViewApplicants";
import Test from "./screens/test.jsx";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test/>} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/listingpage" element={<ListingPage/>}/>
        <Route path="/listingpage/projectpage" element={<ProjectPage/>}/>
        <Route path="/listingpage/settings" element={<Settings/>}/>
        <Route path="/listingpage/myapplications" element={<MyApplications/>}/>
        <Route path="/listingpage/mylistings" element={<MyListings/>}/>
        <Route path="/listingpage/createlisting" element={<CreateListing/>}/>
        <Route path="/listingpage/viewapplicants" element={<ViewApplicants/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
    </div>
  );
}