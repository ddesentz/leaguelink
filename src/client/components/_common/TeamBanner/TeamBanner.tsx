import * as React from "react";
import { teamBannerStyles } from "./TeamBannerStyles";
import { AppBar, Grid, IconButton, Toolbar, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDarkContrast } from "../../../common/Helper/HelperFunctions";

interface ITeamBanner {
  logo: string;
  abbr: string;
  color: string;
}

const TeamBannerComponent: React.FunctionComponent<ITeamBanner> = ({
  logo,
  abbr,
  color,
}) => {
  const { classes } = teamBannerStyles();
  const navigate = useNavigate();
  const useDark = useDarkContrast(color);

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <AppBar className={classes.appBarContainer}>
      <Toolbar className={classes.toolbarContainer}>
        <div
          style={{
            backgroundColor: color + "7f",
            backgroundImage: `linear-gradient(#00000011, ${color}cc)`,
          }}
          className={classes.teamBannerContainer}
        >
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
          <Typography
            className={useDark ? classes.darkText : classes.lightText}
          >
            {abbr}
          </Typography>
          <img src={logo} className={classes.logo} />
        </div>
      </Toolbar>
    </AppBar>
  );
};

export const TeamBanner = TeamBannerComponent;
