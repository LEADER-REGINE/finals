import { Box, Typography, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Image from '../assets/image/bg.png'
import Image2 from '../assets/image/bg2.jpg'
import { Helmet } from "react-helmet";
import firebase from "../config/firebase";
import Grid from '@mui/material/Grid';
import Card1 from '../component/card1'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
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
            justifyContent: "center",
            marginBottom: "50px"
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
        },

        featuredCon: {
            display: "flex",
            alignitems: "center",
            justifyContent: "center",
            marginTop: "50px",
            marginBottom: "50px"
        },
        outerCon2: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "600px",


        },
        featuredSubTitleCon: {
            marginLeft: "250px",
            marginRight: "250px"
        },
        featuredTitle: {
            fontSize: "35px",
            color: "#FB6B6B"
        },

        featuredSubTitle: {
            fontSize: "30px",
        },
        innerCon: {
            backgroundColor: "#F5F5F5",
            padding: "30px",
            marginBottom: '50px'
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


            <Grid container spacing={2} style={{ marginLeft: "60px", marginRight: "60px" }}>


                {
                    getTopResto.topResto.map((data) => {
                        return (
                            <Grid item xs={12} sm={4} md={4} key={data.docID} >
                                <Card sx={{ maxWidth: 345, minHeight: 330 }}>
                                    <CardMedia
                                        component="img"
                                        alt="green iguana"
                                        height="140"
                                        image={data.photoURL}
                                    />
                                    <CardContent sx={{ textAlign: 'center' }}>
                                        <Typography gutterBottom variant="h5" component="div" noWrap>
                                            {data.restoName}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {data.address}
                                        </Typography>
                                    </CardContent>

                                    <Box sx={{ textAlign: "center", mb: "20px", mt: "40px" }}>
                                        <Button size="small" variant="outlined" onClick={() => history.push(`/${data.docID}/view`)}>Details</Button>
                                    </Box>
                                </Card>
                            </Grid>
                        )
                    })
                }


            </Grid>


            <Box>
                <Box sx={style.featuredCon}>
                    <Typography sx={style.restoLabel}>Featured Restaurant</Typography>
                </Box>

                <Box sx={style.outerCon2} style={{ background: `url(${Image2})`, backgroundSize: "cover", backgroundRepeat: "no-repeat" }}></Box>
                <Box sx={style.innerCon}>
                    <Box sx={style.featuredCon}>
                        <Typography sx={style.featuredTitle}>Barbara's Heritage Restaurant</Typography>
                    </Box>
                    <Box sx={style.featuredSubTitleCon}>
                        <Typography sx={style.featuredSubTitle}>Barbara’s Heritage buffet is a well-curated array of local delicacies such as the classic adobo, kare-kare (a dish made with beef and pork in thick peanut sauce), and gambas de Barbara’s (a shrimp dish good as an appetizer or as a main dish). </Typography>
                    </Box>
                </Box>
            </Box>

            <Box sx={style.restoLabelCon}>
                <Typography sx={style.restoLabel}>Popular Now</Typography>
            </Box>


            <Container>
                <Grid container spacing={2} style={{ marginBottom: "50px", marginLeft: "60px", marginRight: "60px" }} >

                    <Grid item xs={12} sm={4} md={4}>
                        <Card1 />
                    </Grid>

                </Grid>
            </Container>


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



        </Box>
    )
}
