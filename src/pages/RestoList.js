import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";
import { Box, Paper, Typography } from '@mui/material';

const db = firebase.firestore();
export default function RestoList() {
    const history = useHistory();
    const [getAllResto, setgetAllResto] = useState({
        allResto: [],
    });
    const fetchList = () => {
        db.collection("resto")
            .onSnapshot((snapshot) => {
                let topList = [];
                snapshot.forEach((doc) => {
                    topList.push(doc.data());
                });
                setgetAllResto({ allResto: topList });
            });
    }

    useEffect(() => {
        fetchList();
    }, [])

    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>List of Restaurants</title>
                <meta name="description" content="List of Restaurants" />
            </Helmet>
            {
                getAllResto.allResto.map((data) => {
                    return (
                        <Box key={data.docID}>
                            <Paper onClick={() => history.push(`/${data.docID}/view`)}>
                                <Typography>{data.restoName}</Typography>
                                <Typography>{data.address}</Typography>
                                <Typography>{data.contactNo}</Typography>
                                <Typography>Rating: {data.rating}</Typography>
                            </Paper>
                        </Box>
                    )
                })
            }
        </Box>
    )
}
