import React, { useState, useEffect } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import TextField from '@mui/material/TextField';
import ViewRestoTab from '../component/viewRestoTab'
import Rating from "@mui/material/Rating";
import StarRoundedIcon from "@mui/icons-material/StarRounded";


export default function ViewResto() {

    const [ratingVal, setRatingVal] = useState({
        teamwork: "",
        creativity: "",
        adaptability: "",
        leadership: "",
        persuasion: "",
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
    
      useEffect(() => {
        console.log("test:" + total);
      }, [total]);

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
    
    return (

        <Box sx={{ height: "1000px" }}>
            <Box sx={{
                display: 'flex',
                direction: "row",
                justifyContent: "space-between",
                alignItems: "flex-start",
                p:"0px 150px"
            }}>
                <Card sx={{ width: '500px' }}>
                    <ViewRestoTab />
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
                    <Box sx={{textAlign: "center"}}>
                    <TextField id="outlined-basic" label="Enter Your Review" variant="outlined" sx={{m:"20px"}}/>
                    </Box>
                    <Box sx={{ textAlign: "center", mb: "20px" }}>
                        <Button size="small" variant="contained" sx={{color:'white', backgroundColor:'#FA3A3A'}}>Done</Button>
                    </Box>
                </Card>
            </Box>

        </Box>

    );

                }