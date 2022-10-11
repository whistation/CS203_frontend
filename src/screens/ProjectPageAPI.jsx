import * as React from "react";
import axios from "axios";
import {useState, useEffect} from "react";

const [listing, setListing] = useState({});

useEffect(() => {
    const listingId = this.props.route.params.listingId;
    const getListing = async (listingId) => {
        const res = await axios.get(`http://localhost:8080/listingpage/${listingId}`);
        setListing(res.data);
    }
    getListing(listingId);
}, []);