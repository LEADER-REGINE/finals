import { Box, Typography, Paper, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Nappbar from '../component/appbar'
import Image from '../assets/image/bg.png'
import Resto1 from '../assets/image/1.png'
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";
import Grid from '@mui/material/Grid';
import Card1 from '../component/card1'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Banner from '../component/banner'
import { useHistory } from 'react-router-dom';

const db = firebase.firestore();
export default function Home() {
    const history = useHistory();
    const [getTopResto, setgetTopResto] = useState({
        topResto: [],
    });

    const fetchTopRated = () => {
        db.collection("resto").orderBy("rating", "desc").limit(3)
            .onSnapshot((snapshot) => {
                let topList = [];
                snapshot.forEach((doc) => {
                    topList.push(doc.data());
                });
                setgetTopResto({ topResto: topList });
            });
    }

    useEffect(() => {
        fetchTopRated();
    }, [])

    const style = {
        outerCon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "500px",
            flexDirection: "column"
        },
        Label: {
            fontSize: "100px",
            color: "white"
        },
        subLabelCon: {
            border: "4px solid white",
            padding: "5px 30px",
            borderRadius: "8px"
        },
        subLabel: {
            fontSize: "40px",
            color: "white",
        },
        restoLabel: {
            fontSize: "45px",
            fontWeight: 600,
        },
        restoLabelCon: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        topCon: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "30px",
            marginLeft: "50px",
            marginRight: "50px"
        },

        topPaper: {
            paddingBottom: "10px",
            border: "2px solid #FB6B6B",
            marginBottom: "100px",
            marginLeft: "20px",
            marginRight: "20px"
        },
        infoCon: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px"
        },
        btn: {
            marginTop: "30px",
            border: "1px solid #FB6B6B",
            color: "black"
        }
    }
    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Restawran</title>
                <meta name="description" content="Restawrant home page" />
            </Helmet>
            {/* <Box>
                <Nappbar />
            </Box> */}
            <Box sx={style.outerCon} style={{ background: `url(${Image})`, backgroundSize: "100%", backgroundRepeat: "no-repeat" }}>
                <Box>
                    <Typography variant="h1" color="white">
                        Welcome
                    </Typography>
                </Box>

                <Button onClick={() => history.push("/list")} variant='outlined' sx={{ color: 'white', textTransform: 'none', borderColor: 'white' }}>
                    Rate a Resto
                </Button>


            </Box >
            {/* <Banner /> */}
            < Box sx={style.restoLabelCon} >
                <Typography sx={style.restoLabel}>Top Rated Restaurant</Typography>
            </Box >


            <Grid container spacing={2} >


                {
                    getTopResto.topResto.map((data) => {
                        return (
                            <Grid item xs={12} sm={4} md={4} key={data.docID}>
                                <Card sx={{ maxWidth: 345 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={data.photoURL}
                                    />
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {data.restoName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.address}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ textAlign: "center", mb: "20px" }}>
                                        <Button size="small" variant="outlined">Details</Button>
                                    </Box>
                                </Card>
                            </Grid>
                        )
                    })
                }


            </Grid>


            <Box sx={{
                backgroundImage: `url("https://gttp.imgix.net/320727/x/0/20-best-filipino-restaurants-in-metro-manila-philippines-must-try-local-dishes-11.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883")`
            }}>




            </Box>













            {/* <Box sx = {style.topCon}>
                <Paper variant = "outlined" sx = {style.topPaper}>
                    <Box>
                        <Box component = "img" src = {Resto1} sx = {{width : "300px"}}></Box>
                        <Box sx = {style.infoCon}>
                        <Typography sx ={{fontSize : "18px" , fontWeight : 600}}>Guevarra’s by Chef Laudico</Typography>
                        <Typography sx ={{fontSize : "15px"}}>San Juan, 1500 Metro Manila</Typography>
                        <Typography>stars</Typography>
                        <Button variant = "outlined" sx = {style.btn}>Details</Button>
                        </Box>
                    </Box>
                </Paper>
                <Paper variant = "outlined" sx = {style.topPaper}>
                    <Box>
                        <Box component = "img" src = {Resto1} sx = {{width : "300px"}}></Box>
                        <Box sx = {style.infoCon}>
                        <Typography sx ={{fontSize : "18px" , fontWeight : 600}}>Guevarra’s by Chef Laudico</Typography>
                        <Typography sx ={{fontSize : "15px"}}>San Juan, 1500 Metro Manila</Typography>
                        <Typography>stars</Typography>
                        <Button variant = "outlined" sx = {style.btn}>Details</Button>

                        </Box>
                    </Box>
                </Paper>
                <Paper variant = "outlined" sx = {style.topPaper}>
                    <Box>
                        <Box component = "img" src = {Resto1} sx = {{width : "300px"}}></Box>
                        <Box sx = {style.infoCon}>
                        <Typography sx ={{fontSize : "18px" , fontWeight : 600}}>Guevarra’s by Chef Laudico</Typography>
                        <Typography sx ={{fontSize : "15px"}}>San Juan, 1500 Metro Manila</Typography>
                        <Typography>stars</Typography>
                        <Button variant = "outlined" sx = {style.btn}>Details</Button>
                        </Box>
                    </Box>
                </Paper>
            </Box> */}

        </Box >
    )
}
