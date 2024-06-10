import * as React from "react";
import { standardOptionButtonStyles } from "./StandardOptionButtonStyles";
import {
  Button,
  Grid,
  Popover,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { AutoSizer, List } from "react-virtualized";
import { IKeyValue } from "../../../common/types/common/KeyValue";
import { FixedSizeList } from "react-window";

interface IStandardOptionButton {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  options: string[];
  height?: string;
  disabled?: boolean;
  itemSize?: number;
  maxRendered?: number;
}

const StandardOptionButtonComponent: React.FunctionComponent<
  IStandardOptionButton
> = ({ value, setValue, options, height, disabled, itemSize, maxRendered }) => {
  const { classes } = standardOptionButtonStyles();
  const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [buttonWidth, setButtonWidth] = React.useState<number>(0);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setButtonWidth(event.currentTarget.clientWidth);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderOption = (props: any) => {
    const { data, index, style } = props;
    const dataSet = data[index];
    return (
      <Typography
        key={index}
        onClick={() => {
          setValue(dataSet);
          handleClose();
        }}
        style={style}
        className={
          value === dataSet ? classes.selectedOptionText : classes.optionText
        }
      >
        {dataSet}
      </Typography>
    );
  };

  return (
    <>
      <Button
        disableRipple
        disableTouchRipple
        disabled={disabled}
        onClick={handleClick}
        style={
          open
            ? {
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
                height: height,
              }
            : { height: height }
        }
        endIcon={<FontAwesomeIcon icon={open ? faChevronUp : faChevronDown} />}
        className={classes.standardOptionButtonContainer}
      >
        <Typography className={classes.optionButtonText}>{value}</Typography>
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        className={classes.optionsPopover}
      >
        <FixedSizeList
          itemData={options}
          height={Math.min(
            (isMobile ? 5 : maxRendered!) * itemSize!,
            options.length * itemSize!
          )}
          width={buttonWidth}
          itemSize={itemSize}
          overscanCount={5}
          itemCount={options.length}
        >
          {renderOption}
        </FixedSizeList>
      </Popover>
    </>
  );
};

StandardOptionButtonComponent.defaultProps = {
  height: leagueLinkTheme.spacing(10),
  disabled: false,
  itemSize: 56,
  maxRendered: 10,
};

export const StandardOptionButton = StandardOptionButtonComponent;
