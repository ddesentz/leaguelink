import * as React from "react";
import { standardAutocompleteStyles } from "./StandardAutocompleteStyles";
import {
  Autocomplete,
  Paper,
  Popper,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { leagueLinkTheme } from "../../../common/Theme";
import { FixedSizeList } from "react-window";
import { IKeyValue } from "../../../common/types/KeyValue";

interface IStandardAutocomplete {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  searchTerm?: string;
  setSearchTerm?: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  options: string[] | IKeyValue[];
  height?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  maxRendered?: number;
  itemSize?: number;
  itemRenderer?: (item: IKeyValue, index: number) => JSX.Element;
}

const StandardAutocompleteComponent: React.FunctionComponent<
  IStandardAutocomplete
> = ({
  value,
  setValue,
  searchTerm,
  setSearchTerm,
  placeholder,
  options,
  height,
  startIcon,
  endIcon,
  maxRendered,
  itemSize,
  itemRenderer,
}) => {
  const { classes } = standardAutocompleteStyles();

  const ListboxComponent = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLElement>
  >((props, ref) => {
    const { children, ...other } = props;
    const itemData: React.ReactElement[] = [];
    (children as React.ReactElement[]).forEach(
      (item: React.ReactElement & { children?: React.ReactElement[] }) => {
        itemData.push(item);
        itemData.push(...(item.children || []));
      }
    );
    const itemCount = itemData.length;

    const OuterElementContext = React.createContext({});
    const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
      const outerProps = React.useContext(OuterElementContext);
      return <div ref={ref} {...props} {...outerProps} />;
    });

    const defaultRenderer = (props: any) => {
      const { data, index, style } = props;
      const dataSet = data[index];

      return (
        <Typography
          {...dataSet[0]}
          key={index}
          style={style}
          component={"div"}
          className={classes.defaultItemRenderer}
        >
          {itemRenderer ? itemRenderer(dataSet[1], dataSet[2]) : dataSet[1]}
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
    const isMobile = useMediaQuery(leagueLinkTheme.breakpoints.down(310 * 4));

    return (
      <Popper
        open={props.open}
        anchorEl={props.anchorEl}
        className={classes.virtualPopper}
        style={{
          width: isMobile
            ? `calc(100% - ${leagueLinkTheme.spacing(4)})`
            : props.style.width + 24,
        }}
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

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm && setSearchTerm(event.target.value as string);
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
        renderOption={(props, option, state) =>
          [props, option, state.index] as React.ReactNode
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder={placeholder}
            className={classes.textField}
          />
        )}
        value={value}
        onChange={handleOnChange}
        isOptionEqualToValue={(option, value) =>
          itemRenderer ? option.key === value.key : option === value
        }
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
