import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Breadcrumbs from "../../component/breadcrumb";
import Container from "../../hoc/container/container";
import "./student.scss";
import { Formik, Field, Form, FormikHelpers } from "formik";
import Schema from "../../schema";
import { string } from "yup";

interface Values {
    name: string;
    username: string;
    phone: any;
    email: string;
    website: string;
}

function Add() {
    const Navigate = useNavigate();
    const { id } = useParams();

    const [user, setUser] = useState<Values>({
        name: "",
        username: "",
        phone: "",
        email: "",
        website: "",
    });

    const initialValues = {
        name: "",
        username: "",
        phone: "",
        email: "",
        website: "",
    };

    //   const onSubmit = async (e: any) => {
    //     e.preventDefault();
    //     await axios.put(`http://localhost:3001/users/${id}`, user);
    //     Navigate("/student");
    //   };

    const onInputChange = (e: any) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };


    return (
        <Container showHeader={true}>
            <Box className="container p-t-40">
                <Box className="p-b-30">
                    <Breadcrumbs />
                </Box>
                <Box className="Dflex sp-bt al-cnt m-b-30">
                    <h1 className="heading"> Add a User</h1>
                </Box>
                <Paper elevation={1} sx={{ p: 4, maxWidth: 600 }}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={Schema.AddUserSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            await axios.post("http://localhost:3001/users/", user);
                            Navigate("/student");
                        }}>
                        {({
                            errors,
                            handleBlur,
                            handleChange,
                            touched,
                            values,
                            isValid,
                            setValues
                        }) => {
                            // eslint-disable-next-line react-hooks/rules-of-hooks
                            useEffect(() => {
                                setValues(user);
                            }, [user]);
                            return <Form>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="name"
                                            name="name"
                                            value={values.name}
                                            fullWidth
                                            label="Name"
                                            variant="standard"
                                            onChange={e => onInputChange(e)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.name && errors.name)}
                                            helperText={touched.name && errors.name}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="username"
                                            name="username"
                                            value={values.username}
                                            fullWidth
                                            label="Username"
                                            variant="standard"
                                            onChange={e => onInputChange(e)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.username && errors.username)}
                                            helperText={touched.username && errors.username}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="phone"
                                            name="phone"
                                            value={values.phone}
                                            fullWidth
                                            label="Phone"
                                            variant="standard"
                                            onChange={e => onInputChange(e)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.phone && errors.phone)}
                                            helperText={Boolean(touched.phone && errors.phone)}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="email"
                                            name="email"
                                            value={values.email}
                                            fullWidth
                                            label="Email"
                                            variant="standard"
                                            onChange={e => onInputChange(e)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.email && errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            id="website"
                                            name="website"
                                            value={values.website}
                                            fullWidth
                                            label="Website"
                                            variant="standard"
                                            onChange={e => onInputChange(e)}
                                            onBlur={handleBlur}
                                            error={Boolean(touched.website && errors.website)}
                                            helperText={touched.website && errors.website}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button type="submit" variant="outlined">
                                            Submit
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        }}
                    </Formik>
                </Paper>
            </Box>
        </Container>
    );
}

export default Add;
