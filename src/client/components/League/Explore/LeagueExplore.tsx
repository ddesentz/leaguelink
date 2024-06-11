import * as React from "react";
import { leagueExploreStyles } from "./LeagueExploreStyles";
import { Avatar, Grid, IconButton, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faLocationDot,
  faMagnifyingGlass,
  faMapLocationDot,
  faUserGroup,
} from "@fortawesome/free-solid-svg-icons";
import { LeagueHeader } from "../../LeagueHeader/LeagueHeader";
import { StandardInput } from "../../_common/StandardInput/StandardInput";
import { AutoSizer, List } from "react-virtualized";
import useDetectKeyboardOpen from "use-detect-keyboard-open";
import { useNavigate, useParams } from "react-router";
import algoliasearch from "algoliasearch";
import Parser from "html-react-parser";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import { leagueLinkTheme } from "../../../common/Theme";

interface ILeagueExplore {}

const LeagueExploreComponent: React.FunctionComponent<ILeagueExplore> = () => {
  const { classes } = leagueExploreStyles();
  const { leagueId } = useParams();
  const navigate = useNavigate();
  const keyboardOpen = useDetectKeyboardOpen();
  const [viewMap, setViewMap] = React.useState<boolean>(false);
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchResults, setSearchResults] = React.useState<any[]>([]);

  const client = algoliasearch(
    process.env.REACT_APP_ALGOLIA_APP_ID,
    process.env.REACT_APP_ALGOLIA_SEARCH_KEY
  );
  const courseIndex = client.initIndex("teams");

  React.useEffect(() => {
    if (!viewMap) {
      fetchPlayersAndTeams(searchValue);
    } else {
    }
  }, [searchValue, viewMap]);

  const fetchPlayersAndTeams = async (searchTerm: string) => {
    courseIndex.search(searchTerm).then(({ hits }) => {
      setSearchResults(hits);
    });
  };

  const ActionButton = () => (
    <IconButton
      disableFocusRipple
      disableRipple
      onClick={() => setViewMap((prevValue) => !prevValue)}
    >
      <FontAwesomeIcon
        icon={viewMap ? faUserGroup : faMapLocationDot}
        className={classes.actionIcon}
      />
    </IconButton>
  );

  const renderTeamResult = (item: any) => {
    const highlightText = item._highlightResult;
    return (
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="flex-start"
        className={classes.teamRenderContainer}
        onClick={() => navigate(`/${leagueId}/team/${item.objectID}`)}
      >
        <Avatar
          src={item.photoURL}
          style={{ backgroundColor: item.teamColor }}
          className={classes.teamLogo}
        />
        <Grid
          container
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          className={classes.teamTextContainer}
        >
          <Typography className={classes.teamNameText}>
            {Parser(highlightText.teamName.value)}{" "}
            <Typography component="span" className={classes.teamAbbrText}>
              ({Parser(highlightText.abbr.value)})
            </Typography>
          </Typography>
          <Typography className={classes.teamCourseText}>
            <FontAwesomeIcon
              icon={faLocationDot}
              className={classes.courseItemLocationIcon}
            />
            {Parser(highlightText.homeCourse.value)}{" "}
            <Typography component="span" className={classes.teamLocationText}>
              {Parser(highlightText.homeCity.value)},{" "}
              {Parser(highlightText.homeState.value)}
            </Typography>
          </Typography>
        </Grid>
      </Grid>
    );
  };

  const renderSearchResult = (props: any) => {
    const { index, style } = props;
    const item = searchResults[index];
    return (
      <div key={index} style={style} className={classes.searchItemContainer}>
        {renderTeamResult(item)}
      </div>
    );
  };

  return (
    <div className={classes.leagueExploreContainer}>
      <LeagueHeader title="Explore" actionButton={ActionButton} />
      <div
        className={
          keyboardOpen ? classes.keyboardContentWrapper : classes.contentWrapper
        }
      >
        <StandardInput
          value={searchValue}
          setValue={setSearchValue}
          placeholder={viewMap ? "Search Courses" : "Search Players & Teams"}
          startIcon={
            keyboardOpen ? (
              <FontAwesomeIcon
                icon={faChevronLeft}
                className={classes.searchIcon}
              />
            ) : null
          }
          endIcon={
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className={classes.searchIcon}
            />
          }
        />
        <div className={classes.listContainer}>
          <AutoSizer>
            {({ width, height }) => (
              <List
                width={width}
                height={height}
                overscanRowCount={3}
                rowCount={searchResults.length}
                rowHeight={60}
                rowRenderer={renderSearchResult}
              />
            )}
          </AutoSizer>
        </div>
      </div>
    </div>
  );
};

export const LeagueExplore = LeagueExploreComponent;
