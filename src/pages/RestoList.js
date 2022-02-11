import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';




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

            <Typography variant='h4' sx={{ textAlign: 'center', m:"20px" }}>Resto Lists</Typography>
            <Typography sx={{color:"#FA3A3A", textAlign: 'center', mb:"40px"}}>Share and Rate Your Experience</Typography>


            <Grid container spacing={2} sx={{marginLeft : "60px" , marginRight : "60px", mb:"30px"}}>
            {
                getAllResto.allResto.map((data) => {
                    return (
                        
                            <Grid item xs={12} sm={4} md={4} key={data.docID}>
                                <Card sx={{ maxWidth: 345 }} onClick={() => history.push(`/${data.docID}/view`)}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={data.photoURL}
                                    />
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography gutterBottom variant="h6" component="div" noWrap>
                                            {data.restoName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.address}
                                        </Typography>
                                        <Typography>{data.contactNo}</Typography>
                                        <Typography>Rating: {data.rating}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        
                    )
                })
            }
            </Grid>
        </Box>
    )
}
