import * as React from "react";
import { leagueUserDetailsStyles } from "./LeagueUserDetailsStyles";
import { IPlayerData } from "../../../common/types/NETC/PlayerData";
import { Avatar, Grid, Typography, useMediaQuery } from "@mui/material";
import { StandardOptionButton } from "../../_common/StandardOptionButton/StandardOptionButton";
import { leagueLinkTheme } from "../../../common/Theme";
import { StandardButton } from "../../_common/StandardButton/StandardButton";
import { ITeamData } from "../../../common/types/NETC/TeamData";
import { useNavigate, useParams } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRegistered } from "@fortawesome/free-solid-svg-icons";

interface ILeagueUserDetails {
  playerData: IPlayerData;
  teamData: ITeamData | null;
  pdgaRating: number | string | null;
  season: string;
  setSeason: React.Dispatch<React.SetStateAction<string>>;
}

const LeagueUserDetailsComponent: React.FunctionComponent<
  ILeagueUserDetails
> = ({ playerData, teamData, pdgaRating, season, setSeason }) => {
  const { classes } = leagueUserDetailsStyles();
  const navigate = useNavigate();
  const { leagueId } = useParams();
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));

  const handleNavigateToTeamPage = () => {
    if (playerData.teamId) {
      navigate(`/${leagueId}/team/${playerData.teamId}`);
    }
  };

  const handleNavigateToPDGAProfile = () => {
    window.open(
      `https://www.pdga.com/player/${playerData.pdgaNumber}`,
      "_blank"
    );
  };

  return (
    <Grid
      id="playerDetailsContainer"
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
            onClick={handleNavigateToTeamPage}
            style={{ cursor: "pointer" }}
            className={classes.rowDetailContainer}
          >
            <Typography className={classes.rowDetailValue}>
              {teamData ? teamData.abbr : "F/A"}
            </Typography>
            <Typography className={classes.rowDetailLabel}>Team</Typography>
          </Grid>
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
          <Grid
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            onClick={handleNavigateToPDGAProfile}
          >
            <img
              src={"/assets/icons/pdgaIcon.ico"}
              alt=""
              onClick={() => navigate(`/`)}
              className={classes.pdgaIcon}
            />
            <Typography className={classes.pdgaNumberText}>
              #{playerData.pdgaNumber}
            </Typography>
            {pdgaRating && (
              <>
                <FontAwesomeIcon
                  icon={faRegistered}
                  className={classes.ratingIcon}
                />
                <Typography className={classes.pdgaRatingText}>
                  {pdgaRating}
                </Typography>
              </>
            )}
          </Grid>
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
