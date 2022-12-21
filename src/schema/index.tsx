import * as Yup from "yup";

/* Adduser schema validation */

const AddUserSchema = () => {
    return Yup.object().shape({
        name: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Name is required"),
        username: Yup.string()
            .min(2, "Too Short!")
            .max(50, "Too Long!")
            .required("Username is required"),
        phone: Yup.string()
            // .matches(
            //     /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/,
            //     "Phone number is not valid"
            // )
            .required("Phone is required"),

        email: Yup.string().trim().required("Email is required").email().max(50),
        website: Yup.string()
            .matches(
                /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
                "Enter correct url!"
            )
            .required("Please enter website"),
    });
};

const Schema = {
    AddUserSchema,
};

export default Schema;
