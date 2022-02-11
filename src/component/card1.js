import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material'
import firebase from "../config/firebase";



const db = firebase.firestore();


export default function card1() {



    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="140"
                image="https://media-cdn.tripadvisor.com/media/photo-s/07/eb/a1/02/chef-laudico-guevarra.jpg"
            />
            <CardContent sx={{ textAlign: 'center' }}>
                <Typography gutterBottom variant="h5" component="div">
                    Guevarra’s by Chef Laudico
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    San Juan, 1500 Metro Manila
                </Typography>
            </CardContent>

            <Box sx={{ textAlign: "center", mb: "20px" }}>
                <Button size="small" variant="outlined">Details</Button>
            </Box>
        </Card>
    );
}