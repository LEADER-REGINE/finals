import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Nappbar from '../component/appbar'
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";

const db = firebase.firestore();

export default function Home() {

    const [getTopResto, setgetTopResto] = useState({
        topResto: [],
    });

    const fetchTopRated = () => {
        db.collection("resto").orderBy("rating", "desc")
            .onSnapshot({ includeMetadataChanges: true }, (snapshot) => {
                let topList = [];
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        console.log("New resto: ", change.doc.data());
                    }

                    topList.push(change.doc.data());

                    var source = snapshot.metadata.fromCache ? "local cache" : "server";
                    console.log("Data came from " + source);
                });
                setgetTopResto({ topResto: topList });
            });
    }

    useEffect(() => {
        fetchTopRated();
    }, [])


    const style = {

    }
    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Restawrant</title>
                <meta name="description" content="Restawrant home page" />
            </Helmet>
            <Box>
                <Nappbar />
            </Box>
            <Box>
                hello
            </Box>
        </Box>
    )
}
