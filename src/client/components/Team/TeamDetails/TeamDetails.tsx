import * as React from "react";
import { teamDetailsStyles } from "./TeamDetailsStyles";
import { ITeamData } from "../../../common/types/NETC/TeamData";
import { Avatar, Grid, Typography, useMediaQuery } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { StandardOptionButton } from "../../_common/StandardOptionButton/StandardOptionButton";
import { StandardButton } from "../../_common/StandardButton/StandardButton";
import { leagueLinkTheme } from "../../../common/Theme";

interface ITeamDetails {
  teamData: ITeamData;
}

const TeamDetailsComponent: React.FunctionComponent<ITeamDetails> = ({
  teamData,
}) => {
  const { classes } = teamDetailsStyles();
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));
  const [season, setSeason] = React.useState<string>("2023-2024");

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      className={classes.teamDetailsContainer}
    >
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.teamDetailsRow}
      >
        <Avatar
          src={teamData.photoURL}
          style={{ backgroundColor: teamData.teamColor }}
          className={classes.teamLogo}
        />
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
              {teamData.pool}
            </Typography>
            <Typography className={classes.rowDetailLabel}>Pool</Typography>
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
        <Typography className={classes.teamNameText}>
          {teamData.teamName}
        </Typography>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
        >
          <Typography className={classes.teamCourseText}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={classes.courseItemLocationIcon}
            />
            {teamData.homeCourse}
          </Typography>
          <Typography className={classes.teamLocationText}>
            {teamData.homeCity}, {teamData.homeState}
          </Typography>
        </Grid>
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
              text="Edit Team"
              onClick={() => console.log("Edit Team")}
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

export const TeamDetails = TeamDetailsComponent;
