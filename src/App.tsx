import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  useOutlet,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./client/hooks/useAuth";
import { LeagueLink } from "./client/pages/LeagueLink/LeagueLink";
import { Login } from "./client/pages/Login/Login";
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";

interface IApp {}

const AuthLayout = () => {
  const outlet = useOutlet();
  const user = window.localStorage.getItem("user");
  const { theme } = useStyles();

  return (
    <>
      <AuthProvider userData={user}>
        {outlet}
        <GlobalStyles
          styles={{
            "@keyframes panWeb": {
              "0%": {
                backgroundPosition: "0% 0%",
              },
              "100%": {
                backgroundPosition: "1000% 1000%",
              },
            },
            "@keyframes panMobile": {
              "0%": {
                backgroundPosition: "0% 0%",
              },
              "100%": {
                backgroundPosition: "1000% 5000%",
              },
            },
          }}
        />
      </AuthProvider>
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/:page?" element={<LeagueLink />} />
      <Route path="/auth/login" element={<Login />} />
    </Route>
  )
);
