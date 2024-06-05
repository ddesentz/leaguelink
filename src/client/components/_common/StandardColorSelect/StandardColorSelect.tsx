import * as React from "react";
import { standardColorSelectStyles } from "./StandardColorSelectStyles";
import { Paper, Popover } from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";
import { HexColorPicker } from "react-colorful";
import { StandardInput } from "../StandardInput/StandardInput";

interface IStandardColorSelect {
  height?: string;
}

const StandardColorSelectComponent: React.FunctionComponent<
  IStandardColorSelect
> = ({ height }) => {
  const { classes } = standardColorSelectStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [color, setColor] = React.useState("#7F9FBA");
  const [width, setWidth] = React.useState(0);

  const handleClick = (event: any) => {
    setWidth(event.currentTarget.offsetWidth);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Paper
        style={{ height: height, backgroundColor: color }}
        onClick={handleClick}
        className={classes.standardColorSelectContainer}
      />
      <Popover
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        PaperProps={{
          style: { width: width, overflow: "visible" },
        }}
      >
        <HexColorPicker
          color={color}
          onChange={setColor}
          className={classes.colorPicker}
        />
        <StandardInput value={color} setValue={setColor} />
      </Popover>
    </>
  );
};

StandardColorSelectComponent.defaultProps = {
  height: leagueLinkTheme.spacing(10),
};

export const StandardColorSelect = StandardColorSelectComponent;
