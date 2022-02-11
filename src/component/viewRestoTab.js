import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import firebase from "../config/firebase";
import { useHistory, useParams } from 'react-router-dom';

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

  const [getrestoProfile, setrestoProfile] = React.useState({
    profile: [],
  });

  const fetchData = async () => {
    const restoRef = db.collection('resto').doc(restoID);
    let restoProfile = [];
    restoRef.get().then(doc => {
      restoProfile.push(doc.data());
      setrestoProfile({ profile: restoProfile });
    })
  }

  React.useEffect(() => {
    fetchData();
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
                <Typography>{data.restoName}</Typography>
                <Box>
                  <Typography>{data.descriptionLong}</Typography>
                </Box>
              </Box>
            )
          })
        }
      </TabPanel>
      <TabPanel value={value} index={1}>
        Review
      </TabPanel>
      <TabPanel value={value} index={2}>
        Special
      </TabPanel>
    </Box>
  );
}
