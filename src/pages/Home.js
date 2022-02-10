import { Box, Typography , Paper ,Button } from '@mui/material'
import React , {useState , useEffect} from 'react'
import Nappbar from '../component/appbar'
import Image from '../assets/image/bg.png'
import Resto1 from '../assets/image/1.png'
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
        outerCon : {
            display : "flex",
            alignItems : "center",
            justifyContent : "center",
            height : "500px",
            flexDirection : "column"
        },
        Label : {
            fontSize : "130px",
            color : "white"
        },
        subLabelCon : {
            border : "4px solid white",
            padding : "5px 30px",
            borderRadius : "8px"
        },
        subLabel : {
            fontSize : "40px",
            color : "white",
        },
        restoLabel : {
            fontSize : "45px",
            fontWeight : 600,
        },
        restoLabelCon : {
            display : "flex",
            alignItems : "center",
            justifyContent : "center"
        },
        topCon : {
            display : "flex",
            flexDirection : "row",
            justifyContent : "center",
            alignItems:"center",
            marginTop : "30px",
            marginLeft : "50px",
            marginRight : "50px"
        },

        topPaper : {
            paddingBottom : "10px",
            border : "2px solid #FB6B6B",
            marginBottom : "100px",
            marginLeft : "20px",
            marginRight : "20px"
        },
        infoCon : {
            display:"flex",
            justifyContent : "center",
            alignItems : "center",
            flexDirection : "column",
            marginTop : "20px"
        },
        btn : {
            marginTop : "30px",
            border : "1px solid #FB6B6B",
            color : "black"
        }
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
            <Box sx = {style.outerCon} style ={{ background: `url(${Image})`,backgroundSize : "100%" ,backgroundRepeat : "no-repeat"}}>
                <Box>
                <Typography sx = {style.Label}>
                    Welcome
                </Typography>
                </Box>
                <Box sx = {style.subLabelCon}>
                <Typography sx = {style.subLabel}>
                    Rate a Resto
                </Typography>
                </Box>
                
            </Box>
            <Box sx = {style.restoLabelCon}>
                <Typography sx = {style.restoLabel}>Top Rated Restaurant</Typography>
            </Box>
            <Box sx = {style.topCon}>
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
            </Box>
            
        </Box>
    )
}
