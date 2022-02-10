import { Box, Typography } from '@mui/material'
import React from 'react'
import Nappbar from '../component/appbar'
import { Helmet } from "react-helmet";

export default function Home() {
    const style = {

    }
    return (
        <Box>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Restawrant</title>
                <meta name="description" content="Restawrant home page" />
            </Helmet>
            <Box>
                <Nappbar />
            </Box>
            <Box>
                hello
            </Box>
        </Box>
    )
}
