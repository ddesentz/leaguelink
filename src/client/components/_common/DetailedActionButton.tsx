import * as React from "react";
import { detailedActionButtonStyles } from "./DetailedActionButtonStyles";
import { Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface IDetailedActionButton {
  title: string;
  description: string;
  handleClick: () => void;
}

const DetailedActionButtonComponent: React.FunctionComponent<
  IDetailedActionButton
> = ({ title, description, handleClick }) => {
  const { classes } = detailedActionButtonStyles();

  return (
    <Grid
      container
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      className={classes.detailedActionButtonContainer}
      onClick={handleClick}
    >
      <div className={classes.highlightBar} />
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="flex-start"
        className={classes.textContainer}
      >
        <Typography className={classes.titleText}>{title}</Typography>
        <Typography className={classes.descriptionText}>
          {description}
        </Typography>
      </Grid>
      <IconButton disableFocusRipple disableRipple>
        <FontAwesomeIcon icon={faChevronRight} className={classes.actionIcon} />
      </IconButton>
    </Grid>
  );
};

export const DetailedActionButton = DetailedActionButtonComponent;
