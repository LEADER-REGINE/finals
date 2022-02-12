import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import firebase from "../config/firebase";
import { useHistory, useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
const db = firebase.firestore();
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs({ restoID }) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [specialEmpty, setspecialEmpty] = React.useState(true);
  const [reviewEmpty, setreviewEmpty] = React.useState(true);

  const [getrestoProfile, setrestoProfile] = React.useState({
    profile: [],
  });

  const [getrestoSpecials, setrestoSpecials] = React.useState({
    specials: [],
  });

  const [getrestoReviews, setrestoReviews] = React.useState({
    reviews: [],
  });


  const fetchData = async () => {
    const restoRef = db.collection('resto').doc(restoID);
    let restoProfile = [];
    restoRef.get().then(doc => {
      restoProfile.push(doc.data());
      setrestoProfile({ profile: restoProfile });
    })
  }

  const fetchSpecials = async () => {
    db.collection("resto")
      .doc(restoID)
      .collection("specials")
      .onSnapshot((snapshot) => {
        if (snapshot.size > 0) {
          let specialsList = [];
          snapshot.forEach((doc) => {
            specialsList.push(doc.data());
          });
          setrestoSpecials({ specials: specialsList });
          setspecialEmpty(false);
        } else {
          setspecialEmpty(true);
        }

      });
  }

  const fetchReviews = async () => {
    db.collection("resto")
      .doc(restoID)
      .collection("reviews")
      .onSnapshot((snapshot) => {
        if (snapshot.size > 0) {
          let reviewsList = [];
          snapshot.forEach((doc) => {
            reviewsList.push(doc.data());
          });
          setrestoReviews({ reviews: reviewsList });
          setreviewEmpty(false);
        } else {
          setreviewEmpty(true);
        }

      });
  }

  React.useEffect(() => {
    fetchData();
    fetchReviews();
    fetchSpecials();
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Overview" {...a11yProps(0)} />
          <Tab label="Review" {...a11yProps(1)} />
          <Tab label="Special" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        {
          getrestoProfile.profile.map((data) => {
            return (
              <Box>
                <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                  <Typography>{data.restoName}</Typography>
                  <Rating readOnly value={data.rating} />
                </Box>
                <Box>
                  <Typography>{data.descriptionLong}</Typography>
                </Box>
              </Box>
            )
          })
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        {
          reviewEmpty ? (
            <Typography>There are no reviews for this restaurant</Typography>
          ) : (
            <Box>
              {
                getrestoReviews.reviews.map((data2) => {
                  return (
                    <Box>
                      <Typography>{data2.email}</Typography>
                      <Typography>{data2.postBody}</Typography>
                      <Rating readOnly value={data2.userRating} />
                    </Box>
                  )
                })
              }
            </Box>
          )

        }
      </TabPanel>
      <TabPanel value={value} index={2}>
        {
          specialEmpty ? (
            <Typography>There are no set special dishes for this restaurant</Typography>
          ) : (
            <Box
            // sx={{width:"100%", height:"200px"}}
            >
              {
                getrestoSpecials.specials.map((data3) => {
                  return (
                    <Box key={data3.docID}
                    // sx={{width:"100%", height:"100%"}}
                    >
                      {/* <Box
                        sx={{
                          backgroundImage: `url( https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuyTF34PwKd59RgJ8ewsmj2x-iZ3nR-Bp1ZA&usqp=CAU)`,
                          backgroundRepeat: 'no-repeat',
                          backgroundSize: "100% auto"
                        }}

                      ></Box> */}


                      {/* <img src={data3.photoURL} alt={data3.dishName}  /> */}
                      <Typography>{data3.dishName}</Typography>
                    </Box>
                  )
                })
              }
            </Box>
          )

        }
      </TabPanel>
    </Box>
  );
}
