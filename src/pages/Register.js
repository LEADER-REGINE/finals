import {
    Box, Typography, Button, TextField, FormGroup,
    FormControl,
    FormHelperText,
} from '@mui/material'
import React, { useState } from 'react'
import firebase from "../config/firebase";
import { useHistory, Link } from 'react-router-dom';

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
                firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
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

    return (
        <Box>
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
                    <TextField
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
                    <Button variant='contained' onClick={() => register()}>REGISTER</Button>
                    <Link to="/login">Already have an account? Login</Link>
                </FormControl>
            </FormGroup>
        </Box>
    )
}
