import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../utils/routes";
import { CircularProgress } from "@mui/material";
import React from "react";
const Router = () => {
  return (
    <React.Fragment>
        <Routes>
          {routes.map((item, index) => {
            return (
              <Route
                path={item.path}
                key={index}
                element={
                  <Suspense
                    fallback={
                      <div className="globle_loder">
                        <CircularProgress />
                      </div>
                    }
                  >
                    {<item.element />}
                  </Suspense>
                }
              />
            );
          })}
        </Routes>
    </React.Fragment>
  );
};

export default Router;
