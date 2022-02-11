import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import ViewRestoTab from '../component/viewRestoTab'
import { useHistory, useParams } from 'react-router-dom';

export default function Pages() {

    const { id } = useParams();
    
    return (

        <Box sx={{ padding:"150px 0px",
        backgroundImage: `url( https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyTF34PwKd59RgJ8ewsmj2x-iZ3nR-Bp1ZA&usqp=CAU)`, 
        backgroundRepeat:'no-repeat',
        backgroundSize:"100% auto" }}>
            <Box sx={{
                display: 'flex',
                direction: "column",
                justifyContent: "center",
                alignItems: "center",
                height:'100%'
            }}>
                <Box sx={{
                    display: 'flex',
                    direction: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                   
                }}>
                    <Card sx={{ width: '500px', mr:'100px' }}>
                        <ViewRestoTab />
                    </Card>
                    <Card>
                        <CardContent sx={{ textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div">
                                Make A Review
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Stars
                            </Typography>
                        </CardContent>
                        <TextField id="outlined-basic" label="Enter Your Review" variant="outlined" sx={{ m: "20px" }} />
                        <Box sx={{ textAlign: "center", mb: "20px" }}>
                            <Button size="small" variant="contained" sx={{ color: 'white', backgroundColor: '#FA3A3A' }}>Done</Button>
                        </Box>
                    </Card>
                </Box>
                
            </Box>

        </Box>

    )

}