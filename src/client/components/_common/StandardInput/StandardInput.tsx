import * as React from "react";
import { standardInputStyles } from "./StandardInputStyles";
import { InputBase, Paper } from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";
import { is } from "cheerio/lib/api/traversing";

interface IStandardInput {
  value: string | number;
  setValue: React.Dispatch<React.SetStateAction<string | number>>;
  placeholder?: string;
  error?: boolean;
  height?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxLength?: number;
  isNumber?: boolean;
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
  isNumber,
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
        type={isNumber ? "number" : "text"}
        inputMode={isNumber ? "numeric" : "text"}
        componentsProps={{
          input: {
            inputMode: isNumber ? "numeric" : "text",
            pattern: isNumber ? "[0-9]*" : undefined,
          },
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
  isNumber: false,
};

export const StandardInput = StandardInputComponent;
