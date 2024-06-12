import * as React from "react";
import { userBannerStyles } from "./UserBannerStyles";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { IPlayerData } from "../../../common/types/NETC/PlayerData";
import { ITeamData } from "../../../common/types/NETC/TeamData";
import { useDarkContrast } from "../../../common/Helper/HelperFunctions";
import { leagueLinkTheme } from "../../../common/Theme";

interface IUserBanner {
  playerData: IPlayerData;
  teamData: ITeamData | null;
  displayBackButton?: boolean;
}

const UserBannerComponent: React.FunctionComponent<IUserBanner> = ({
  playerData,
  teamData,
  displayBackButton,
}) => {
  const { classes } = userBannerStyles();
  const navigate = useNavigate();
  const useDark = useDarkContrast(
    teamData ? teamData.teamColor : leagueLinkTheme.palette.background.default
  );

  const getBannerName = () => {
    const splitName = playerData.displayName.split(" ");
    if (splitName.length === 2) {
      return splitName[0][0] + ". " + splitName[1];
    }
    return splitName[0];
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar className={classes.appBarContainer}>
      <Toolbar className={classes.toolbarContainer}>
        <div
          style={{
            backgroundColor: teamData
              ? teamData.teamColor + "7f"
              : leagueLinkTheme.palette.background.default + "7f",
            backgroundImage: teamData
              ? `linear-gradient(#00000011, ${teamData.teamColor + "cc"})`
              : `linear-gradient(#00000011, ${leagueLinkTheme.palette.primary.dark + "cc"})`,
          }}
          className={classes.teamBannerContainer}
        >
          {displayBackButton && (
            <Grid item className={classes.leftItems}>
              <IconButton
                disableFocusRipple
                disableRipple
                onClick={handleBack}
                className={useDark ? classes.darkButton : classes.lightButton}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </IconButton>
            </Grid>
          )}
          <Typography
            component={"span"}
            className={useDark ? classes.darkText : classes.lightText}
          >
            {getBannerName()}
          </Typography>
          {teamData && <img src={teamData.photoURL} className={classes.logo} />}
        </div>
      </Toolbar>
    </AppBar>
  );
};

UserBannerComponent.defaultProps = {
  displayBackButton: true,
};

export const UserBanner = UserBannerComponent;
