import { Button } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Container from '../../hoc/container/container'
import './auth.scss'

function Login() {
    return (
        <Container showHeader={false}>
            <Button variant="contained" className='derken m-t-20'>Darken</Button>
            <Box className="lighten">Lighten</Box>
            <Box className="mix">Mix</Box>
            <Box className="mapget">Mix</Box>

            <Box className="dark-light">Dark light</Box>
        </Container>
    )
}

export default Login
