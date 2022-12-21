import { Box, Grid } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumbs from '../../component/breadcrumb'
import Container from '../../hoc/container/container'
import './student.scss'

function Details() {
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
    address: { street: "", suite: "", city: "", zipcode: "" }
  });

  const [notUser, setNotUser] = useState(false);

  const { id } = useParams();
  useEffect(() => {
    loadUser();
  }, []);

  let navigate = useNavigate();

  const loadUser = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/users/${id}`);
      setUser(response.data);
    } catch (error: any) {
      if (error.response.status === 404) {
        //navigate("/student");
        setNotUser(true)
      }
    }
  }

  return (
    <Container showHeader={true}>
      <Box className='container p-t-40'>
        {!notUser ? (
          <>
            <Box className='p-b-30'><Breadcrumbs /></Box>
            <Box className='Dflex sp-bt al-cnt m-b-30'>
              <h1 className='heading'>{user.name}</h1>
            </Box>
            <Box className="detailsContainer">
              <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 5 }}>
                <Grid item xs={6}>
                  <label>Username:</label> {user.username}
                </Grid>
                <Grid item xs={6}>
                  <label>Email:</label> {user.email}
                </Grid>
                <Grid item xs={6}>
                  <label>Phone:</label> {user.phone}
                </Grid>
                <Grid item xs={6}>
                  <label>Website:</label> {user.website}
                </Grid>
                <Grid item xs={6}>
                  <label>Company Details:</label> {user.company.name}, {user.company.catchPhrase}, {user.company.bs}
                </Grid>
                <Grid item xs={6}>
                  <label>Address:</label> {user.address.street}, {user.address.suite}, {user.address.city}, {user.address.zipcode}
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <Box className="notavailable">
            <h2>Not Available User</h2>
            <Link className="text_nav themeBlue" to="/student">Back to Student Listing</Link>
          </Box>
        )}
      </Box>
    </Container>
  )
}

export default Details
