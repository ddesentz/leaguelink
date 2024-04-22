import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  useOutlet,
  Route,
} from "react-router-dom";
import { AuthProvider } from "./client/hooks/useAuth";
import { LeagueLink } from "./client/pages/LeagueLinkHome/LeagueLinkHome";
import { Login } from "./client/pages/Login/Login";
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";
import { League } from "./client/pages/League/League";

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
            "*::-webkit-scrollbar": {
              width: "1em",
              height: "1em",
            },
            "*::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.background.default,
              borderRadius: theme.spacing(2),
            },
            "*::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.spacing(2),
              border: `0.3em solid ${theme.palette.background.default}`,
            },
            "*::-webkit-scrollbar-corner": {
              backgroundColor: theme.palette.background.default,
            },
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
      <Route path="/" element={<LeagueLink />} />
      <Route path="/:league/:page?" element={<League />} />
      <Route path="/:league/user/:userId?" element={<League />} />
      <Route path="/auth/login" element={<Login />} />
    </Route>
  )
);
