import * as React from "react";
import { standardAutocompleteStyles } from "./StandardAutocompleteStyles";
import {
  Autocomplete,
  Paper,
  Popper,
  TextField,
  Typography,
} from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";
import { FixedSizeList } from "react-window";

type IKeyValue = {
  key: string;
  value: any;
};

interface IStandardAutocomplete {
  placeholder: string;
  options: string[] | IKeyValue[];
  height?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxRendered?: number;
  itemSize?: number;
}

const StandardAutocompleteComponent: React.FunctionComponent<
  IStandardAutocomplete
> = ({
  placeholder,
  options,
  height,
  startIcon,
  endIcon,
  maxRendered,
  itemSize,
}) => {
  const { classes } = standardAutocompleteStyles();
  const [value, setValue] = React.useState<string | IKeyValue | null>(null);

  const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
  >((props, ref) => {
    const { children, ...other } = props;
    const itemData: React.ReactElement[] =
      props.children as React.ReactElement[];
    const itemCount = itemData.length;

    const OuterElementContext = React.createContext({});
    const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
      const outerProps = React.useContext(OuterElementContext);
      return <div ref={ref} {...props} {...outerProps} />;
    });

    const defaultRenderer = (props: any) => {
      const { index, style } = props;
      return (
        <Typography
          id={`item-${index}`}
          key={index}
          style={style}
          className={classes.defaultItemRenderer}
        >
          {itemData[index]}
        </Typography>
      );
    };

    return (
      <div ref={ref}>
        <OuterElementContext.Provider value={other}>
          <FixedSizeList
            itemData={itemData}
            height={Math.min(maxRendered! * itemSize!, itemCount * itemSize!)}
            width="100%"
            outerElementType={OuterElementType}
            itemSize={itemSize!}
            overscanCount={5}
            itemCount={itemCount}
          >
            {defaultRenderer}
          </FixedSizeList>
        </OuterElementContext.Provider>
      </div>
    );
  });

  const VirtualPopper = (props: any) => {
    return (
      <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        className={classes.virtualPopper}
        style={{ width: props.style.width + 24 }}
      >
        {props.children}
      </Popper>
    );
  };

  const handleOnChange = (
    event: React.SyntheticEvent<Element, Event>,
    value: string | IKeyValue | null
  ) => {
    setValue(value);
  };

  return (
    <Paper
      style={{ height: height, fontSize: `calc(${height} / 2.5)` }}
      className={classes.standardAutocompleteContainer}
    >
      <Autocomplete
        options={[...options]}
        disableListWrap
        getOptionLabel={(option) => {
          if (typeof option === "object") return option.key;
          return option;
        }}
        PopperComponent={VirtualPopper}
        ListboxComponent={ListboxComponent}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            placeholder={placeholder}
            className={classes.textField}
          />
        )}
        value={value}
        onChange={handleOnChange}
        className={classes.autocomplete}
      />
    </Paper>
  );
};

StandardAutocompleteComponent.defaultProps = {
  height: leagueLinkTheme.spacing(10),
  maxRendered: 10,
  itemSize: 56,
};

export const StandardAutocomplete = StandardAutocompleteComponent;
