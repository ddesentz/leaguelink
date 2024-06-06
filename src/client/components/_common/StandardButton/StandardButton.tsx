import * as React from "react";
import { standardButtonStyles } from "./StandardButtonStyles";
import { Button, Typography } from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";

interface IStandardButton {
  text: string;
  onClick: () => void;
  height?: string;
  disabled?: boolean;
}

const StandardButtonComponent: React.FunctionComponent<IStandardButton> = ({
  text,
  onClick,
  height,
  disabled,
}) => {
  const { classes } = standardButtonStyles();

  return (
    <Button
      disableRipple
      disableTouchRipple
      disabled={disabled}
      onClick={onClick}
      style={{ height: height }}
      className={classes.primaryButtonContainer}
    >
      {text}
    </Button>
  );
};

StandardButtonComponent.defaultProps = {
  height: leagueLinkTheme.spacing(10),
  disabled: false,
};

export const StandardButton = StandardButtonComponent;
