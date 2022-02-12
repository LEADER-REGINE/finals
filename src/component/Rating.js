import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import * as Mui from "@mui/material";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, TwitterAuthProvider, FacebookAuthProvider } from "firebase/auth";
import firebase from "../config/firebase";


const fbprovider = new FacebookAuthProvider();
const googleprovider = new GoogleAuthProvider();
const twitterprovider = new TwitterAuthProvider();

const auth = getAuth();
const user = auth.currentUser;

function LoginWithGoogle() {

  signInWithPopup(auth, googleprovider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });

}

const style = {
  ratingContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    flexWrap: "wrap",
    background: "#131414",
    paddingTop: "0",
    alignItems: "center",
    "@media only screen and (max-width : 720px)": {
      justifyContent: "center",
    },
  },

  ratingPaper: {
    height: {
      xs: "200px",
      sm: "380px",
      md: "556px",
    },
    width: {
      xs: "160px",
      sm: "300px",
      md: "400px",
    },
    margin: {
      xs: "10px",
      sm: "15px",
      md: "20px",
    },

    backgroundColor: "#FFFFFF",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    position: "static",
    border: "1px solid #303336",


    "@media only screen and (max-width : 720px)": {
      marginTop: "10px",
    },
  },
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

  rateTxt: {
    position: "static",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "7px",
      sm: "12px",
      md: "18px",
    },
    lineHeight: "20px",
    display: "flex",
    textAlign: "center",
    color: "000000",
    margin: {
      xs: "5px",
      sm: "14px",
      md: "20px",

    },
    justifyContent: "center",
  },
  // share us style
  labelTxt: {
    position: "static",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: {
      xs: "4.2px",
      sm: "10px",
      md: "14px",
    },
    lineHeight: "20px",
    display: "flex",
    textAlign: "center",
    color: "white",
    margin: {
      xs: ".1px",
      sm: "5px",
      md: "14px",

    },
    justifyContent: "center",
  },
  criteria: {
    fontFamily: "Roboto",
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
  commentBox: {
    backgroundColor: "#FFFFFF",
    position: 'absolute',
    height: {
      xs: "20px",
      sm: "70px",
      md: "100px",
    },
    width: {
      xs: "100px",
      sm: "200px",
      md: "336px",
    },
    border: "1px solid #303336",
    boderRadius: "8px",


  },
  submitButton: {
    fontSize: {
      xs: "4.2px",
      sm: "10px",
      md: "14px",
    },
    backgroundColor: "#FA3A3A",
    height: {
      xs: "15px",
      sm: "30px",
      md: "44px",
    },
    width: {
      xs: "50px",
      sm: "90px",
      md: "143px",
    },
    marginTop: {
      xs: "25px",
      sm: "80px",
      md: "120px",
    },
  },

};



export default function BasicRating() {

  const user = auth.currentUser;

  const [isLoggedin, setIsLoggedIn] = React.useState(false);

  const db = firebase.firestore();

  getAuth().onAuthStateChanged(function (user) {
    setIsLoggedIn(user);
  });

  const [ratingVal, setRatingVal] = React.useState({
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

  const [payload, setPayload] = React.useState({
    postBody: "",
  });

  const userInput = (prop) => (e) => {
    setPayload({ ...payload, [prop]: e.target.value });
  };

  const [total, setTotal] = React.useState(0);

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

  function setRating(e) {


    // e.preventDefault();
    // let userRef = db.collection("students").doc(localStorage.getItem("userID"));

    // userRef.get().then((doc) => {
    //   let revs = doc.data().reviews;
    //   let rate = doc.data().ovrall_rating;
    //   let ratingNum = doc.data().ratingNum;

    //   let newnum = ratingNum + total;
    //   let newrev = parseInt(revs, 10) + 1;
    //   let newrate = Math.round(newnum / newrev);

    //   userRef.collection("comments").add({
    //     review: payload.postBody,
    //     final_rating: total,
    //     email: user.email,
    //     img: user.photoURL,
    //     timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   }).then((docRef) => {
    //     userRef.collection("comments").doc(docRef.id).update({
    //       id: docRef.id,
    //     }).then(() => {
    //       userRef.update({
    //         reviews: newrev,
    //         ovrall_rating: newrate,
    //         ratingNum: newnum,
    //       }).then(function () {
    //         setPayload({
    //           postBody: '',
    //         });
    //         window.location.reload(false);
    //       });
    //     })
    //   }).catch((error) => {
    //     console.error("Error writing document: ", error);
    //   });

    // })

  }

  return (
    <Mui.Box sx={style.ratingContainer}>
      
        <Mui.Box>
          <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center">
            <Typography sx={style.addStars} component="legend">
              Add your Rating
            </Typography>
            <Rating
              icon={<StarRoundedIcon sx={style.rofilledStars} />}
              emptyIcon={<StarRoundedIcon sx={style.roemptyStars} />}
              value={total}
              readOnly
            />
          </Box>
          <Mui.Paper sx={style.ratingPaper} >
            <Mui.Box
              sx={{
                "& > legend": { mt: 2 },
              }}
            >

              <Typography sx={style.rateTxt}>Make a Review</Typography>
              <hr
                    style={{
                      width: 350,
                      color: "primary",
                      backgroundColor: "primary",
                      height: 0.5,
                      borderColor: "primary",
                    }}
                  />
              <Mui.Box sx={style.allign2}>

                <Mui.Box sx={style.allign}>
                  <Typography sx={style.criteria}>Teamwork</Typography>
                  <Typography sx={style.criteria}>Creativity</Typography>
                  <Typography sx={style.criteria}>Adaptability</Typography>
                  <Typography sx={style.criteria}>Leadership</Typography>
                  <Typography sx={style.criteria}>Persuation</Typography>
                </Mui.Box>
                <Mui.Box sx={style.allign}>
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
                </Mui.Box>
              </Mui.Box>
              <Typography sx={style.labelTxt}>Share us your thoughts!</Typography>
              <form onSubmit={setRating}>
                <Typography sx={style.labelTxt}>
                  <TextField
                    multiline
                    rows={3}
                    sx={style.commentBox}
                    onChange={userInput("postBody")}
                    value={payload.postBody}

                    InputProps = {{style : {color : "white"}}}
                  />
                  <Button sx={style.submitButton} variant="contained" type="submit" className="submitButton" >Submit</Button>
                </Typography>
              </form>


            </Mui.Box>

          </Mui.Paper>
        </Mui.Box>
        
        

  
    </Mui.Box>
  );
}
