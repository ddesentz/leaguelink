import * as React from "react";
import { teamBannerStyles } from "./TeamBannerStyles";
import { Typography } from "@mui/material";

interface ITeamBanner {
  logo: string;
  abbr: string;
  primaryColor: string;
  secondaryColor: string;
}

const TeamBannerComponent: React.FunctionComponent<ITeamBanner> = ({
  logo,
  abbr,
  primaryColor,
  secondaryColor,
}) => {
  const { classes } = teamBannerStyles();

  return (
    <div
      style={{
        backgroundColor: primaryColor,
        borderBottom: `2px solid ${secondaryColor}`,
      }}
      className={classes.teamBannerContainer}
    >
      <Typography
        style={{ color: secondaryColor }}
        className={classes.abbrText}
      >
        {abbr}
      </Typography>
      <img src={logo} className={classes.logo} />
    </div>
  );
};

export const TeamBanner = TeamBannerComponent;
