import * as React from "react";
import { leagueUserDetailsStyles } from "./LeagueUserDetailsStyles";
import { IPlayerData } from "../../../common/types/NETC/PlayerData";
import { Avatar, Grid, Typography, useMediaQuery } from "@mui/material";
import { StandardOptionButton } from "../../_common/StandardOptionButton/StandardOptionButton";
import { leagueLinkTheme } from "../../../common/Theme";
import { StandardButton } from "../../_common/StandardButton/StandardButton";
import { ITeamData } from "../../../common/types/NETC/TeamData";

interface ILeagueUserDetails {
  playerData: IPlayerData;
  teamData: ITeamData | null;
}

const LeagueUserDetailsComponent: React.FunctionComponent<
  ILeagueUserDetails
> = ({ playerData, teamData }) => {
  const { classes } = leagueUserDetailsStyles();
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));
  const [season, setSeason] = React.useState<string>("2023-2024");
  const [playerRating, setPlayerRating] = React.useState<number | null>(null);

  React.useEffect(() => {
    if (playerData.pdgaNumber) {
      getRating(playerData.pdgaNumber);
    }
  }, [playerData]);

  const getRating = async (pdgaNumber: number) => {};

  const handleNavigateToPDGAProfile = () => {
    window.open(
      `https://www.pdga.com/player/${playerData.pdgaNumber}`,
      "_blank"
    );
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      className={classes.playerDetailsContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.playerDetailsRow}
      >
        <Avatar src={playerData.photoURL} className={classes.playerLogo} />
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-evenly"
          className={classes.detailsWrapper}
        >
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.rowDetailContainer}
          >
            <Typography className={classes.rowDetailValue}>
              {teamData ? teamData.abbr : "F/A"}
            </Typography>
            <Typography className={classes.rowDetailLabel}>Team</Typography>
          </Grid>
          {playerRating && (
            <Grid
              container
              direction="column"
              alignItems="center"
              justifyContent="center"
              className={classes.rowDetailContainer}
            >
              <Typography className={classes.rowDetailValue}>Test</Typography>
              <Typography className={classes.rowDetailLabel}>Pool</Typography>
            </Grid>
          )}
          <Grid
            container
            direction="column"
            alignItems="center"
            justifyContent="center"
            className={classes.rowDetailContainer}
          >
            <Typography className={classes.rowDetailValue}>4-0</Typography>
            <Typography className={classes.rowDetailLabel}>Record</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
      >
        <Typography className={classes.playerNameText}>
          {playerData.displayName}
        </Typography>
        {playerData.pdgaNumber && (
          <Typography
            onClick={handleNavigateToPDGAProfile}
            className={classes.pdgaNumberText}
          >
            #{playerData.pdgaNumber}
          </Typography>
        )}
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          className={classes.actionContainer}
        >
          <div className={classes.actionButtonWrapper}>
            <StandardOptionButton
              value={season}
              setValue={setSeason}
              options={[
                "2023-2024",
                "2022-2023",
                "2021-2022",
                "2020-2021",
                "2019-2020",
                "2018-2019",
              ]}
              height={
                isMobile
                  ? leagueLinkTheme.spacing(8)
                  : leagueLinkTheme.spacing(12)
              }
            />
          </div>
          <div className={classes.actionButtonWrapper}>
            <StandardButton
              text="Edit Profile"
              onClick={() => {
                // playerSignals.editingplayer.value = playerData;
              }}
              height={
                isMobile
                  ? leagueLinkTheme.spacing(8)
                  : leagueLinkTheme.spacing(12)
              }
            />
          </div>
        </Grid>
      </Grid>
    </Grid>
  );
};

export const LeagueUserDetails = LeagueUserDetailsComponent;
