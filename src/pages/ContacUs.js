import React from 'react'
import { Box, Typography, TextField, Autocomplete, Paper, Button } from '@mui/material'
import { color, fontSize, height } from '@mui/system';




export default function ContacUs() {

    const style = {
        title: {
            fontSize: "45px",
            fontWeight: 600,
        },
        titleContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
        },
        detailsContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "10px",
            color: "#000000",


        },
        email: {
            width: '530px',

        },
        dropdown: {
            width: '530px',



        },
        inputText: {
            width: '530px',
            marginBottom: "50px",

        },
        btn: {
            backgroundColor: "#FB6B6B",
            color: "#FFFFFF",
            '&:hover': {
                backgroundColor: "#FFBBBB",
                borderColor: "#ffffff",
                boxShadow: 'none',
            },
            width: "200px"
        }
    }
    const top100Films = [
        { label: 'Account Issues' },
        { label: 'Rating' },
        { label: 'Suggestions' },
        { label: 'Others' },

    ];

    return (
        <Box>
            <Box sx={style.titleContainer}>
                <Typography sx={style.title}>Contact Us</Typography>
            </Box>

            <Box sx={style.detailsContainer}>
                <TextField id="outlined-basic" label="Email" variant="outlined" sx={style.email} />
            </Box>
            <Box sx={style.detailsContainer}>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={style.dropdown}
                    renderInput={(params) => <TextField {...params} label="What's this About" />}
                />
            </Box>
            <Box sx={style.detailsContainer}>
                <TextField
                    id="outlined-multiline-static"
                    // label="Go ahead we're listening"
                    multiline
                    rows={4}
                    placeholder="Tell something..."
                    sx={style.inputText}

                />
            </Box>
            <Box sx={style.detailsContainer}>
                <Button color="primary" variant="contained" sx={style.btn}>Submit</Button>
            </Box>
        </Box>
    )
}
