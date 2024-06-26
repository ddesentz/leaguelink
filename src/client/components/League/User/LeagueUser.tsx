import * as React from "react";
import { leagueUserStyles } from "./LeagueUserStyles";
import { UserBanner } from "../../_common/UserBanner/UserBanner";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { app, db } from "../../../..";
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
import { getFunctions, httpsCallable } from "firebase/functions";
import { PlayerPDGAFeed } from "../../PDGA/PlayerPDGAFeed/PlayerPDGAFeed";
import * as cheerio from "cheerio";
import { isMobile } from "react-device-detect";
import { scrapeUserPDGAData } from "../../../common/Helper/HelperFunctions";
import { IPDGATournamentResult } from "../../../common/types/DiscGolf/PDGA/PDGA";
import { EditPlayer } from "../../../pages/Edit/Player/EditPlayer";
import { useAppSignals } from "../../../common/AppContext";

interface ILeagueUser {}

const LeagueUserComponent: React.FunctionComponent<ILeagueUser> = () => {
  const { classes } = leagueUserStyles();
  const auth = getAuth();
  const params = useParams();
  const functions = getFunctions(app);
  const { playerSignals } = useAppSignals();
  const { editingPlayer } = playerSignals;
  const league = getLocalStorage("selectedLeague");
  const [displayUser, setDisplayUser] = React.useState<IPlayerData | null>(
    null
  );
  const [playerTeam, setPlayerTeam] = React.useState<ITeamData | null>(null);
  const [pdgaRating, setPDGARating] = React.useState<number | string | null>(
    null
  );
  const [noUser, setNoUser] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<string>("Stats");
  const [season, setSeason] = React.useState<string>("2023-2024");
  const [pdgaScrapeList, setPDGAScrapeList] = React.useState<
    IPDGATournamentResult[] | null
  >(null);
  const [pdgaTournamentList, setPDGATournamentList] = React.useState<
    IPDGATournamentResult[] | null
  >(null);

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
              console.log(playerData);
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

  React.useEffect(() => {
    if (displayUser?.pdgaNumber) {
      getPDGADetails(displayUser.pdgaNumber, season.split("-")[1]);
    }
  }, [displayUser?.pdgaNumber, season]);

  React.useEffect(() => {
    if (pdgaScrapeList) {
      const q = query(
        collection(
          db,
          `leagues/${league.id}/players/${params.userId}/pdgaEvents/year/${season.split("-")[1]}`
        ),
        orderBy("details.endDate", "desc")
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPDGATournamentList(
          snapshot.docs.map((doc) => doc.data()) as IPDGATournamentResult[]
        );
        const events = [];
        snapshot.forEach((doc) => {
          events.push(doc.id);
        });

        const newEvents = pdgaScrapeList.filter(
          (pdgaEvent) => !events.includes(pdgaEvent.tournamentId)
        );
        newEvents.forEach((event) => {
          setDoc(
            doc(
              db,
              `leagues/${league.id}/players/${params.userId}/pdgaEvents/year/${season.split("-")[1]}`,
              event.tournamentId
            ),
            event
          );
        });
      });

      return () => {
        unsubscribe();
        setPDGATournamentList(null);
      };
    }
  }, [pdgaScrapeList]);

  const getTeam = async (teamId: string) => {
    await getDoc(doc(db, `leagues/${params.leagueId}/teams`, teamId)).then(
      (doc) => {
        if (doc.exists()) {
          setPlayerTeam(doc.data() as ITeamData);
        }
      }
    );
  };

  const getPDGADetails = async (pdgaNumber: number, year: string) => {
    setPDGATournamentList(null);
    const callableReturnMessage = httpsCallable(functions, "getPlayerPage");
    callableReturnMessage({
      pdgaNumber: pdgaNumber,
      year: year,
    }).then((result: any) => {
      const $ = cheerio.load(result.data);
      const currentRating = $(".current-rating").text();
      if (currentRating) {
        setPDGARating(currentRating.split(":")[1].trim().split(" ")[0]);
      } else {
        const membershipStatus = $(".membership-status").text();
        if (membershipStatus) {
          setPDGARating("Expired");
        } else {
          setPDGARating(null);
        }
      }
      setPDGAScrapeList(scrapeUserPDGAData(result.data, year));
    });
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

  const renderFeed = () => {
    switch (selectedTab) {
      case "Stats":
        return <div>Stats</div>;
      case "Matches":
        return <div>Matches</div>;
      case "PDGA":
        return (
          <PlayerPDGAFeed
            pdgaNumber={displayUser.pdgaNumber}
            year={season.split("-")[1]}
            tournamentList={pdgaTournamentList}
          />
        );
    }
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
      {editingPlayer.value ? (
        <>
          <UserBanner
            playerData={editingPlayer.value}
            teamData={playerTeam}
            isEditing={true}
          />
          <EditPlayer />
        </>
      ) : (
        <>
          <UserBanner playerData={displayUser} teamData={playerTeam} />
          <div
            id="playerContentWrapper"
            style={{ overflow: isMobile ? "auto" : "hidden" }}
            className={classes.contentWrapper}
          >
            <LeagueUserDetails
              playerData={displayUser}
              teamData={playerTeam}
              pdgaRating={pdgaRating}
              season={season}
              setSeason={setSeason}
            />
            <Tabs
              id="playerTabOptions"
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
              {displayUser && displayUser.pdgaNumber && (
                <Tab
                  label="PDGA"
                  value={"PDGA"}
                  disableRipple
                  className={classes.tab}
                />
              )}
            </Tabs>
            <div className={classes.feedContent}>{renderFeed()}</div>
          </div>
        </>
      )}
    </div>
  );
};

export const LeagueUser = LeagueUserComponent;
