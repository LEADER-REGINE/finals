import React from 'react';
import { Box, Typography } from '@mui/material'

import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import TwitterIcon from '@mui/icons-material/Twitter';
import TelegramIcon from '@mui/icons-material/Telegram';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom';

export default function Component() {
    const history = useHistory();
    return (

        <Box sx={{
            with: '100%', backgroundColor: "black", height: '250px', display: 'flex', flexDirection: "column",
            justifyContent: "space-around",
            alignItems: "center", padding: "20px 0px 20px 0px"
        }}>
            <Typography sx={{ color: 'white' }}>Restawran</Typography>



            <Box>
                <FacebookRoundedIcon sx={{ color: 'white', margin: "0px 20px 0px 20px" }} />
                <TwitterIcon sx={{ color: 'white', margin: "0px 20px 0px 20px" }} />
                <TelegramIcon sx={{ color: 'white', margin: "0px 20px 0px 20px" }} />
            </Box>
            <Box>
                <Button sx={{ textTransform: 'none', color: 'white' }} onClick={() => history.push("/")}>Home</Button>
                <Button sx={{ textTransform: 'none', color: 'white' }} onClick={() => history.push("/list")}>Resto List</Button>
                <Button sx={{ textTransform: 'none', color: 'white' }} onClick={() => history.push("/contactus")}>Contact Us</Button>
            </Box>
            <Typography sx={{ color: 'white', mt: '20px' }}>Copyright  ©2022 Restawran</Typography>
        </Box>

    )

}