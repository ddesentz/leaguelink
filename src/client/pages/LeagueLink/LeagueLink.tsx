import * as React from "react";
import { leagueLinkStyles } from "./LeagueLinkStyles";
import { useAuth } from "../../hooks/useAuth";
import { Navigate, useParams } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useLocalStorage } from "../../hooks/useLocalStorage";

interface ILeagueLink {}

const LeagueLinkComponent: React.FunctionComponent<ILeagueLink> = () => {
  const { classes } = leagueLinkStyles();
  const { currentUser } = useAuth();
  const params = useParams();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [selectedPage, setSelectedPage] = useLocalStorage("pageSelect", "/");

  React.useEffect(() => {
    setSelectedPage(params.page ? `/${params.page}` : "/");
  }, [params.page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user === null || currentUser === null) {
    return <Navigate to="/auth/login" replace />;
  }

  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div className={classes.leagueLinkContainer}>
      <div onClick={handleSignOut}>Sign Out</div>
    </div>
  );
};

export const LeagueLink = LeagueLinkComponent;
