import * as React from "react";
import { leagueListStyles } from "./LeagueListStyles";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db, storage } from "../../..";
import { Grid, Skeleton, Typography } from "@mui/material";
import { getDownloadURL, ref, updateMetadata } from "firebase/storage";
import { useNavigate } from "react-router";
import { setLocalStorage } from "../../hooks/useLocalStorage";

interface ILeague {
  id: string;
  name: string;
  photoURL: string;
  sport: string;
  abbr: string;
}
interface ILeagueCard {
  league: ILeague;
}
const LeagueCard: React.FunctionComponent<ILeagueCard> = ({ league }) => {
  const { classes } = leagueListStyles();
  const navigate = useNavigate();
  const [imgLoaded, setImgLoaded] = React.useState<boolean>(false);

  React.useEffect(() => {
    const pathReference = ref(storage, `leagues/${league.photoURL}`);
    getDownloadURL(pathReference).then((url) => {
      const img = document.getElementById(league.name + "-banner");
      if (img) {
        img.setAttribute("src", url);
        setImgLoaded(true);
        const newMetadata = {
          cacheControl: "public,max-age=300",
        };
        updateMetadata(pathReference, newMetadata);
      }
    });
  }, [league.photoURL]);

  const handleNavigateToLeague = () => {
    setLocalStorage("selectedLeague", league);
    navigate(`/${league.id}`);
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent=" flex-start"
      onClick={handleNavigateToLeague}
      className={classes.leagueCardContainer}
    >
      <img
        id={league.name + "-banner"}
        alt={league.name}
        src="/assets/LeagueLink_Logo_v1.png"
        className={classes.leagueImg}
        style={{ display: imgLoaded ? "block" : "none" }}
      />
      {!imgLoaded && (
        <Skeleton
          variant="rectangular"
          width={"100%"}
          height={"20svh"}
          className={classes.leagueImg}
        />
      )}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography className={classes.leagueText}>{league.name}</Typography>
        <img src="/assets/icons/dgIcon.svg" className={classes.sportIcon} />
      </Grid>
    </Grid>
  );
};

interface ILeagueList {}
const LeagueListComponent: React.FunctionComponent<ILeagueList> = () => {
  const { classes } = leagueListStyles();
  const [leagues, setLeagues] = React.useState([]);

  React.useEffect(() => {
    const allLeaugesQuery = query(collection(db, "leagues"));
    const unsubscribe = onSnapshot(allLeaugesQuery, (snapshot) => {
      setLeagues(
        (snapshot.docs as any).map((doc: any) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className={classes.leagueListContainer}>
      {leagues.map((league: ILeague) => (
        <LeagueCard key={league.name} league={league} />
      ))}
    </div>
  );
};

export const LeagueList = LeagueListComponent;
