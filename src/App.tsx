import * as React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  useOutlet,
  Route,
} from "react-router-dom";
import { LeagueLink } from "./client/pages/LeagueLinkHome/LeagueLinkHome";
import { Login } from "./client/pages/Login/Login";
import { GlobalStyles } from "tss-react";
import { useStyles } from "tss-react/mui";
import { League } from "./client/pages/League/League";
import { Match } from "./client/pages/Match/Match";
import { CreateTeam } from "./client/pages/Create/Team/CreateTeam";
import { Team } from "./client/pages/Team/Team";
import { getAuth } from "firebase/auth";

const AuthLayout = () => {
  const outlet = useOutlet();
  const currentUser = getAuth();
  const { theme } = useStyles();

  return (
    <>
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
          ".ReactVirtualized__Grid__innerScrollContainer": {
            display: "flex",
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
          "@keyframes hoverButton": {
            from: {
              transform: "translate(-50%, -50%) scale(2) rotate(0turn)",
            },
            to: {
              transform: "translate(-50%, -50%) scale(2) rotate(1turn)",
            },
          },
        }}
      />
    </>
  );
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AuthLayout />}>
      <Route path="/" element={<LeagueLink />} />
      <Route path="/:leagueId/:page?" element={<League />} />
      <Route path="/:leagueId/user/:userId?" element={<League />} />
      <Route path="/:leagueId/:page/:matchId" element={<Match />} />
      <Route path="/:leagueId/team/create" element={<CreateTeam />} />
      <Route path="/:leagueId/team/:teamId" element={<Team />} />
      <Route path="/auth/login" element={<Login />} />
    </Route>
  )
);
