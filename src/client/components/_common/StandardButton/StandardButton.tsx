import * as React from "react";
import { standardButtonStyles } from "./StandardButtonStyles";
import { Button, Typography } from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";
import { LoadingDots } from "../../../common/rive/LoadingDots";

interface IStandardButton {
  text: string;
  onClick: () => void;
  height?: string;
  disabled?: boolean;
  loading?: boolean;
  endIcon?: React.ReactNode;
}

const StandardButtonComponent: React.FunctionComponent<IStandardButton> = ({
  text,
  onClick,
  height,
  disabled,
  loading,
  endIcon,
}) => {
  const { classes } = standardButtonStyles();

  return (
    <Button
      disableRipple
      disableTouchRipple
      disabled={disabled}
      onClick={onClick}
      style={{ height: height }}
      endIcon={endIcon}
      className={classes.primaryButtonContainer}
    >
      {loading ? <LoadingDots /> : text}
    </Button>
  );
};

StandardButtonComponent.defaultProps = {
  height: leagueLinkTheme.spacing(10),
  disabled: false,
  loading: false,
  endIcon: undefined,
};

export const StandardButton = StandardButtonComponent;
