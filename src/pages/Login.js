import {
    Box, Typography, Button, TextField, FormGroup,
    FormControl,
    FormHelperText,
} from '@mui/material'
import React, { useState } from 'react'
import firebase from "../config/firebase";
import { useHistory } from 'react-router-dom';
import { Helmet } from "react-helmet";

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
                    history.push("/")
                })
                .catch((error) => {
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.log(errorCode);
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

    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Login</title>
                <meta name="description" content="User login" />
            </Helmet>
            <FormGroup>
                <FormControl>
                    <TextField
                        required
                        id="filled-required"
                        placeholder="E-mail"
                        variant="outlined"
                        autoComplete="off"
                        onChange={userInput("email")}
                    />
                </FormControl>
                <FormControl>
                    <TextField
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
                    <Button variant='contained' onClick={() => login()}>LOGIN</Button>
                    <Button variant='contained' onClick={() => history.push("/register")}>REGISTER</Button>
                </FormControl>
            </FormGroup>
        </Box>
    )
}
