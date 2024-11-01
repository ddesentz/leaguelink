import * as React from "react";
import { leagueLinkStyles } from "./LeagueLinkHomeStyles";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { LoadingFull } from "../../common/rive/LoadingFull";
import { AppHeader } from "../../components/AppHeader/AppHeader";
import { LeagueList } from "../../components/LeagueList/LeagueList";

interface ILeagueLink {}

const LeagueLinkComponent: React.FunctionComponent<ILeagueLink> = () => {
  const { classes } = leagueLinkStyles();
  const currentUser = getAuth();
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
      <AppHeader />
      <LeagueList />
    </div>
  );
};

export const LeagueLink = LeagueLinkComponent;
