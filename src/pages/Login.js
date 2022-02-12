import {
    Box, Typography, Button, TextField, FormGroup,
    FormControl,
    FormHelperText,
    Paper
} from '@mui/material'
import React, { useState } from 'react'
import firebase from "../config/firebase";
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";
import bg from '../assets/image/bgg.jpg'
import EmailIcon from "@mui/icons-material/Email";
import InputAdornment from "@mui/material/InputAdornment";
import LockIcon from "@mui/icons-material/Lock";
const db = firebase.firestore();


export default function Login() {

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
    });

    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };

    const login = (e) => {
        if (!payload.email) {
            alert("Please enter your email");
        } else if (!payload.password) {
            alert("Please enter your password");
        } else {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
                .then((userCredential) => {
                    // Signed in
                    var user = userCredential.user;
                    // ...
                    history.push("/");
                    localStorage.setItem("uid", user.uid);
                })
                .catch((error) => {
                    var errorCode = error.code;
                    if (errorCode == "auth/invalid-email") {
                        alert("Invalid Email.");
                    }
                    if (errorCode == "auth/user-not-found") {
                        alert("This user does not exist.");
                    }
                    if (errorCode == "auth/invalid-password") {
                        alert("Invalid Password.");
                    }
                });
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
        }
    }

    return (
        <Box sx = {style.bgCon} style={{ background: `url(${bg})`, backgroundSize: "100%", backgroundRepeat: "no-repeat" }}>
            
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <meta name="description" content="User login" />
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
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <EmailIcon />
                              </InputAdornment>
                            ),
                        }}
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
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LockIcon />
                              </InputAdornment>
                            ),
                        }}
                    />
                </FormControl>
                <FormControl>
                    <Button variant='contained' sx = {style.btnLogin} style = {{ backgroundColor : "#FB6B6B"}} onClick={() => login()}>LOGIN</Button>
                    <Button variant='contained'  sx = {style.btnLogin} style = {{ backgroundColor : "#6E6E6DFF"}} onClick={() => history.push("/register")}>REGISTER</Button>
                </FormControl>
                </Paper>
            </FormGroup>
        </Box>
    )
}
