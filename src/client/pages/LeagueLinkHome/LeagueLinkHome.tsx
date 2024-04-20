import * as React from "react";
import { leagueLinkStyles } from "./LeagueLinkHomeStyles";
import { useAuth } from "../../hooks/useAuth";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingFull } from "../../common/rive/LoadingFull";
import { NavBar } from "../../components/NavBar/NavBar";
import { LeagueList } from "../../components/LeagueList/LeagueList";

interface ILeagueLink {}

const LeagueLinkComponent: React.FunctionComponent<ILeagueLink> = () => {
  const { classes } = leagueLinkStyles();
  const { currentUser } = useAuth();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className={classes.leagueLinkContainer}>
        <div className={classes.loadingModal}>
          <LoadingFull className={classes.loading} />
        </div>
      </div>
    );
  }

  if (user === null || currentUser === null) {
    return <Navigate to="/auth/login" replace />;
  }

  return (
    <div className={classes.leagueLinkContainer}>
      <NavBar />
      <LeagueList />
    </div>
  );
};

export const LeagueLink = LeagueLinkComponent;
