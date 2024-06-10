import * as React from "react";
import { standardInputStyles } from "./StandardInputStyles";
import {
  Autocomplete,
  InputBase,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";

interface IStandardInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
  error?: boolean;
  height?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxLength?: number;
}

const StandardInputComponent: React.FunctionComponent<IStandardInput> = ({
  value,
  setValue,
  placeholder,
  error,
  height,
  startIcon,
  endIcon,
  maxLength,
}) => {
  const { classes } = standardInputStyles();

  return (
    <Paper
      style={{ height: height, fontSize: `calc(${height} / 2.5)` }}
      className={classes.standardInputContainer}
    >
      {startIcon}
      <InputBase
        value={value}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setValue(event.target.value);
        }}
        placeholder={placeholder}
        error={error}
        inputProps={{
          maxLength: maxLength,
        }}
        className={classes.textField}
      />
      {endIcon}
    </Paper>
  );
};

StandardInputComponent.defaultProps = {
  height: leagueLinkTheme.spacing(10),
  error: false,
  maxLength: 524288,
};

export const StandardInput = StandardInputComponent;
