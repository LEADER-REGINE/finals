import React, { useState } from 'react'
import { Box, Typography, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import TextField from '@mui/material/TextField';
import ViewRestoTab from '../component/viewRestoTab'
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useHistory, useParams } from 'react-router-dom';
import firebase from "../config/firebase";

const style = {
    //CONTROLLED
    filledStars: {
        color: "#FFC107",
        fontSize: {
            xs: "10px",
            sm: "20px",
            md: "30px",
        },
    },

    emptyStars: {
        color: "#2C2F31",
        fontSize: {
            xs: "10px",
            sm: "20px",
            md: "30px",
        },
    },
    //READ ONLY
    roemptyStars: {
        color: "#2C2F31",

        fontSize: {
            xs: "10px",
            sm: "20px",
            md: "45px",
        },
    },

    rofilledStars: {
        color: "#26CE8D",
        fontSize: {
            xs: "10px",
            sm: "20px",
            md: "45px",
        },
    },
    addStars: {
        position: "static",
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: {
            xs: "10px",
            sm: "14px",
            md: "18px",
        },
        lineHeight: "20px",
        display: "flex",
        textAlign: "center",
        color: "white",
        marginTop: "24px",
        marginBottom: "24px",
    },


    // share us style

    criteria: {
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: {
            xs: "4.2px",
            sm: "10px",
            md: "14px",
        },
        display: "flex",
        color: "000000",
        margin: {
            xs: "7px 15px",
            sm: "10px 30px",
            md: "15px 40px",
        },

    },
    stars: {
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        display: "flex",
        color: "#D1D4C9",
        margin: {
            xs: "5px 20px",
            sm: "7px 40px",
            md: "10px 60px",
        },

    },
    allign: {
        display: "flex",
        flexDirection: "column",

    },
    allign2: {
        display: "flex",
        flexDirection: "row",

    },


};

const db = firebase.firestore();

export default function ViewResto() {

    const history = useHistory();

    const [ratingVal, setRatingVal] = useState({
        teamwork: "",
        creativity: "",
        adaptability: "",
        leadership: "",
        persuasion: "",
    });

    const [isLoggedIn, setisLoggedIn] = useState(false);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            setisLoggedIn(true);
            sessionStorage.setItem("email", user.email);
            sessionStorage.setItem("uid", user.uid);
            // ...
        } else {
            setisLoggedIn(false);
        }
    });

    const onChange = e => {
        e.persist();

        const ratingValues = {
            ...ratingVal,
            [e.target.name]: e.target.value

        };
        setRatingVal(ratingValues);
        calculateAvgRating(ratingValues);

    };

    const [payload, setPayload] = useState({
        postBody: "",
    });

    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const [total, setTotal] = useState(0);

    const calculateAvgRating = ratingValues => {
        const {
            teamwork,
            creativity,
            adaptability,
            leadership,
            persuasion,
        } = ratingValues;
        const newTotal =
            Number(teamwork) +
            Number(creativity) +
            Number(adaptability) +
            Number(leadership) +
            Number(persuasion);

        const finalAvg = newTotal / 5;
        setTotal(finalAvg);
    };

    const { id } = useParams();

    const rate = (e) => {
        if (!payload.postBody) {
            alert("Please enter a review");
        } else if (!isLoggedIn) {
            alert("Please login to rate a restaurant.");
        }
        else {
            const restoRef = db.collection('resto').doc(id);
            restoRef.get().then(doc => {
                let currentRating = parseInt(doc.data().rating);
                let currentReviews = parseInt(doc.data().reviewNo);
                let newRating = parseInt(currentRating + total);
                let newReviews = parseInt(currentReviews + 1);
                let roundedrate = Math.round(newRating / newReviews);
                let userRating = Math.round(total / 5);

                db.collection("resto")
                    .doc(id)
                    .update({
                        rating: parseInt(roundedrate),
                        reviewNo: parseInt(newReviews)
                    })
                    .then((doc) => {
                        db.collection("resto")
                            .doc(id)
                            .collection("reviews")
                            .add({
                                userRating: total,
                                email: sessionStorage.getItem("email"),
                                postBody: payload.postBody,
                            })
                            .then((doc2) => {
                                db.collection("resto")
                                    .doc(id)
                                    .collection("reviews")
                                    .doc(doc2.id)
                                    .update({
                                        docID: doc2.id,
                                    })
                                    .then((doc3) => {
                                        db.collection("user")
                                            .doc(sessionStorage.getItem("uid"))
                                            .collection("reviews")
                                            .doc(doc2.id)
                                            .set({
                                                docID: doc2.id,
                                                userRating: total,
                                                email: sessionStorage.getItem("email"),
                                                postBody: payload.postBody,
                                            })
                                            .then((doc2) => {
                                                alert("Thank You.");
                                                history.push("/");
                                            })
                                    })
                            })
                    })

            })
        }
    }

    return (

        <Box sx={{
            padding: "150px 0px",
            backgroundImage: `url( https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyTF34PwKd59RgJ8ewsmj2x-iZ3nR-Bp1ZA&usqp=CAU)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: "100% auto"
        }}>
            <Box sx={{
                display: 'flex',
                direction: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: '100%'
            }}>
                <Card sx={{ width: '500px' }}>
                    <ViewRestoTab restoID={id} />
                </Card>
                <Card>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div">
                            Make A Review
                        </Typography>
                        <hr
                            style={{
                                width: 350,
                                color: "primary",
                                backgroundColor: "primary",
                                height: 0.5,
                                borderColor: "primary",
                            }}
                        />
                        <Box sx={style.allign2}>

                            <Box sx={style.allign}>
                                <Typography sx={style.criteria}>Food</Typography>
                                <Typography sx={style.criteria}>Service</Typography>
                                <Typography sx={style.criteria}>Ambiance</Typography>
                                <Typography sx={style.criteria}>Price</Typography>
                                <Typography sx={style.criteria}>Quality</Typography>
                            </Box>
                            <Box sx={style.allign}>
                                <Rating
                                    sx={style.stars}
                                    name="teamwork"
                                    onChange={onChange}
                                    icon={<StarRoundedIcon sx={style.filledStars} />}
                                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}

                                />

                                <Rating
                                    sx={style.stars}
                                    name="creativity"
                                    onChange={onChange}
                                    icon={<StarRoundedIcon sx={style.filledStars} />}
                                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                                />

                                <Rating
                                    sx={style.stars}
                                    name="adaptability"
                                    onChange={onChange}
                                    icon={<StarRoundedIcon sx={style.filledStars} />}
                                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                                />

                                <Rating
                                    sx={style.stars}
                                    name="leadership"
                                    onChange={onChange}
                                    icon={<StarRoundedIcon sx={style.filledStars} />}
                                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                                />

                                <Rating
                                    sx={style.stars}
                                    name="persuasion"
                                    onChange={onChange}
                                    icon={<StarRoundedIcon sx={style.filledStars} />}
                                    emptyIcon={<StarRoundedIcon sx={style.emptyStars} />}
                                />
                            </Box>
                        </Box>
                    </CardContent>
                    <Box sx={{ textAlign: "center" }}>
                        <TextField id="outlined-basic" onChange={userInput("postBody")} label="Enter Your Review" variant="outlined" sx={{ m: "20px" }} />
                    </Box>
                    <Box sx={{ textAlign: "center", mb: "20px" }}>
                        <Button size="small" variant="contained" sx={{ color: 'white', backgroundColor: '#FA3A3A' }} onClick={() => rate()}>Submit</Button>
                    </Box>
                </Card>
            </Box>

        </Box>

    );

}