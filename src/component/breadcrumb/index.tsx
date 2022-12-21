import React from "react";
import './breadcrumb.scss';

import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
const Breadcrumbs = (props:any) => {
  const {
    navigate:any
  } = props;
  const pathname = useLocation().pathname;
  const pathnames = pathname.split("/").filter((x:any) => x);
  const navigate = useNavigate()
  return (
    <MUIBreadcrumbs aria-label="breadcrumb" separator=">">
      {pathnames.length > 0 ? (
        <Link onClick={() => navigate("/")}>Home</Link>
      ) : (
        <Typography> Home </Typography>
      )}
      {pathnames.map((name:any, index:any) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        const nameSp = name.split("-").join(" ");
        return isLast ? (
          <Typography key={name}>{nameSp}</Typography>
        ) : (
          <Link key={name} onClick={() => navigate(routeTo)}>
            {nameSp}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default (Breadcrumbs);
