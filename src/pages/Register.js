import {
    Box, Typography, Button, TextField, FormGroup,
    FormControl,
    FormHelperText,
    Paper
} from '@mui/material'
import React, { useState } from 'react'
import firebase from "../config/firebase";
import { useHistory, Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import bg from '../assets/image/bgg.jpg'

const db = firebase.firestore();


export default function Register() {

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            history.push("/");
            // ...
        }
    });

    const history = useHistory();

    const [payload, setPayload] = useState({
        email: "",
        password: "",
        confirmpassword: "",
    });

    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const register = (e) => {

        if (!payload.email || !payload.password || !payload.confirmpassword) {
            alert("Please fill out all the fields");
        } else {
            if (payload.password != payload.confirmpassword) {
                alert("Password mismatch! Please check your password");
            } else {
                firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
                    .then((userCredential) => {
                        // Signed in
                        var user = userCredential.user;
                        localStorage.setItem("uid", user.uid);
                        // ...
                        var batch = db.batch();
                        batch.set(db.collection("users").doc(user.uid), {
                            email: payload.email,
                        })

                        batch.commit().then((docRef) => {
                            history.push("/");
                        })

                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        
                        if (errorCode == "auth/invalid-email") {
                            alert("Invalid Email.");
                        }
                        if (errorCode == "auth/email-already-exists") {
                            alert("This email already exists.");
                        }
                        if (errorCode == "auth/invalid-password") {
                            alert("Invalid Password. Password must be 6 characters long.");
                        }
                    });
            }
        }
    }

    const style = {
        bgCon : {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
        },
        paperCon : {
            display : "flex",
            flexDirection : "column",
            paddingTop : "50px",
            paddingLeft : "30px",
            paddingRight : "30px",
            paddingBottom : "20px"
           
        },

        textfield : {
            [`& fieldset`]: {
                borderRadius: 5,
              },
        },

        btnLogin : {
            color : "white",
            marginBottom : "20px",
            borderRadius : "8px",
            height : "45px"
        },

        linkCon : {
            display : "flex",
            alignItems : "center",
            justifyContent : "center"
        }
        
    }

    return (
        <Box sx = {style.bgCon} style={{ background: `url(${bg})`, backgroundSize: "100%", backgroundRepeat: "no-repeat" }}>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Register</title>
                <meta name="description" content="User registration" />
            </Helmet>
            <FormGroup>
            <Paper sx = {style.paperCon} elevation = "50px" >
                <FormControl>
                    <TextField style = {{width : "300px" , marginBottom : "30px"}} sx = {style.textfield}
                        required
                        id="filled-required"
                        placeholder="E-mail"
                        variant="outlined"
                        autoComplete="off"
                        onChange={userInput("email")}
                    />
                </FormControl>
                <FormControl>
                    <TextField style = {{width : "300px" , marginBottom : "30px"}} sx = {style.textfield}
                        required
                        id="filled-required"
                        placeholder="Password"
                        variant="outlined"
                        autoComplete="off"
                        type="password"
                        onChange={userInput("password")}
                    />
                </FormControl>
                <FormControl>
                    <TextField style = {{width : "300px" , marginBottom : "30px"}} sx = {style.textfield}
                        required
                        id="filled-required"
                        placeholder="Confirm Password"
                        variant="outlined"
                        autoComplete="off"
                        type="password"
                        onChange={userInput("confirmpassword")}
                    />
                </FormControl>
                <FormControl>
                    <Button variant='contained' sx = {style.btnLogin} style = {{ backgroundColor : "#FB6B6B"}} onClick={() => register()}>REGISTER</Button>
                    <Box sx = {style.linkCon}>
                    <Link style = {{textDecoration : "none" , color : "#6E6E6DFF"}} to="/login">Already have an account? Login</Link>
                    </Box>
                </FormControl>
                </Paper>
            </FormGroup>
        </Box>
    )
}
