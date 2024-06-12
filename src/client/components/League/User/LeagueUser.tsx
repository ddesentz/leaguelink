import * as React from "react";
import { leagueUserStyles } from "./LeagueUserStyles";
import { UserBanner } from "../../_common/UserBanner/UserBanner";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "../../../..";
import { useParams } from "react-router";
import { getLocalStorage } from "../../../hooks/useLocalStorage";
import { IPlayerData } from "../../../common/types/NETC/PlayerData";
import { Grid, Tab, Tabs, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { LeagueHeader } from "../../LeagueHeader/LeagueHeader";
import { LoadingFull } from "../../../common/rive/LoadingFull";
import { LeagueUserDetails } from "./LeagueUserDetails";
import { ITeamData } from "../../../common/types/NETC/TeamData";

interface ILeagueUser {}

const LeagueUserComponent: React.FunctionComponent<ILeagueUser> = () => {
  const { classes } = leagueUserStyles();
  const auth = getAuth();
  const params = useParams();
  const league = getLocalStorage("selectedLeague");
  const [displayUser, setDisplayUser] = React.useState<IPlayerData | null>(
    null
  );
  const [playerTeam, setPlayerTeam] = React.useState<ITeamData | null>(null);
  const [noUser, setNoUser] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<string>("Stats");

  React.useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user && params.userId) {
        onSnapshot(
          doc(db, `leagues/${league.id}/players`, params.userId),
          (snapshot) => {
            if (!snapshot.exists()) {
              if (params.userId === user.uid) {
                createPlayer(user);
              } else {
                setNoUser(true);
              }
            } else {
              const playerData = snapshot.data() as IPlayerData;
              if (playerData.teamId) {
                getTeam(playerData.teamId);
              }
              setDisplayUser(playerData);
            }
          }
        );
      }
    });
    return () => {
      setDisplayUser(null);
      setNoUser(false);
    };
  }, [params.userId]);

  const getTeam = async (teamId: string) => {
    await getDoc(doc(db, `leagues/${params.leagueId}/teams`, teamId)).then(
      (doc) => {
        if (doc.exists()) {
          setPlayerTeam(doc.data() as ITeamData);
        }
      }
    );
  };

  const createPlayer = async (user: User) => {
    const playerData: IPlayerData = {
      playerId: user.uid,
      displayName: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
    };
    await setDoc(
      doc(db, `leagues/${league.id}/players/${user.uid}`),
      playerData
    ).then(() => {
      setDisplayUser(playerData);
    });
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  if (noUser)
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        className={classes.noUserContainer}
      >
        <LeagueHeader />
        <FontAwesomeIcon icon={faUserSlash} className={classes.noUserIcon} />
        <Typography className={classes.noUserText}>User not Found</Typography>
      </Grid>
    );
  if (!displayUser)
    return (
      <div className={classes.loadingModal}>
        <LoadingFull className={classes.loading} />
      </div>
    );
  return (
    <div className={classes.leagueUserContainer}>
      <UserBanner playerData={displayUser} teamData={playerTeam} />
      <div className={classes.contentWrapper}>
        <LeagueUserDetails playerData={displayUser} teamData={playerTeam} />
        <div className={classes.matchContent}>
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            className={classes.tabs}
            TabIndicatorProps={{
              className: classes.tabIndicator,
            }}
          >
            <Tab
              label="Stats"
              value={"Stats"}
              disableRipple
              className={classes.tab}
            />
            <Tab
              label={"Matches"}
              value={"Matches"}
              disableRipple
              className={classes.tab}
            />
            <Tab
              label="PDGA"
              value={"PDGA"}
              disableRipple
              className={classes.tab}
            />
          </Tabs>
          <h1>{selectedTab}</h1>
        </div>
      </div>
    </div>
  );
};

export const LeagueUser = LeagueUserComponent;
