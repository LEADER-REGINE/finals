import {
    Box, Typography, Button, TextField, FormGroup,
    FormControl,
    FormHelperText,
} from '@mui/material'
import React from 'react'
import firebase from "../config/firebase";

const db = firebase.firestore();

export default function Login() {
    const [payload, setPayload] = useState({
        email: "",
        password: "",
    });

    const userInput = (prop) => (e) => {
        setPayload({ ...payload, [prop]: e.target.value });
    };


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
            </FormGroup>
        </Box>
    )
}
