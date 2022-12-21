import { lazy } from "react";
import constant from "./constants";

const Login = lazy(() => import("../screens/auth/login"));
const Signup = lazy(() => import("../screens/auth/signup"));
const StudentListing = lazy(() => import("../screens/student/listing"));
const StudentEdit = lazy(() => import("../screens/student/edit"));
const StudentAdd = lazy(() => import("../screens/student/add"));
const Studentdetails = lazy(() => import("../screens/student/details"));
const pageNotfound = lazy(() => import("../screens/notfound"));


const { routeConstants } = constant;

const {
    login,
    loginPage,
    signUp,
    studentListing, 
    studentEdit, 
    studentAdd,  
    studentdetails,
    pageNotFound,

} = routeConstants;

export const routes = [
    {
        path: login,
        element: Login,
    },
    {
        path: signUp,
        element: Signup,
    },
    {
        path: loginPage,
        element: Login,
    },
    {
        path: studentListing,
        element: StudentListing,
    },
    {
        path: studentEdit,
        element: StudentEdit,
    },
    {
        path: studentAdd,
        element: StudentAdd,
    },
    {
        path: studentdetails,
        element: Studentdetails,
    },
    {
        path: pageNotFound,
        element: pageNotfound,
    },
];
