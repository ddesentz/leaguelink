import * as React from "react";
import { createTeamStyles } from "./CreateTeamStyles";
import { Avatar, Grid, Typography } from "@mui/material";
import defaultShield from "../../../assets/common/defaultShield.png";
import { TeamBanner } from "../../../components/_common/TeamBanner/TeamBanner";
import { StandardInput } from "../../../components/_common/StandardInput/StandardInput";
import { StandardAutocomplete } from "../../../components/_common/StandardAutocomplete/StandardAutocomplete";
import { LeagueNav } from "../../../components/LeagueNav/LeagueNav";
import { StandardColorSelect } from "../../../components/_common/StandardColorSelect/StandardColorSelect";
import { StandardButton } from "../../../components/_common/StandardButton/StandardButton";
import { leagueLinkTheme } from "../../../common/Theme";
import { getFunctions, httpsCallable } from "firebase/functions";
import { IKeyValue } from "../../../common/types/KeyValue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { app } from "../../../..";

interface ICreateTeam {}

const CreateTeamComponent: React.FunctionComponent<ICreateTeam> = () => {
  const { classes } = createTeamStyles();
  const functions = getFunctions(app);
  const [logo, setLogo] = React.useState<string>(defaultShield);
  const [teamName, setTeamName] = React.useState<string>("");
  const [abbr, setAbbr] = React.useState<string>("");
  const [homeCourse, setHomeCourse] = React.useState<IKeyValue | null>(null);
  const [searchCourse, setSearchCourse] = React.useState<string>("");
  const [courseOptions, setCourseOptions] = React.useState<IKeyValue[]>([]);
  const [pool, setPool] = React.useState<string | null>(null);
  const [color, setColor] = React.useState(
    leagueLinkTheme.palette.primary.main
  );
  const ref = React.useRef<HTMLInputElement | null>(null);

  React.useEffect(() => {
    fetchCourses(searchCourse);
  }, [searchCourse]);

  const fetchCourses = async (searchTerm: string) => {
    const callableReturnMessage = httpsCallable(functions, "searchCourses");
    callableReturnMessage({ searchTerm: searchTerm }).then((result: any) => {
      const courseList = result.data.courseResults;
      setCourseOptions(
        courseList.map((course: any) => {
          return {
            key: course.name,
            value: { location: course.locationText },
          };
        })
      );
    });
  };

  const FileSelector = () =>
    React.createElement("input", {
      type: "file",
      accept: "image/png, image/jpeg",
      ref: ref,
      style: { display: "none" },
      onChange: function (e) {
        if (e.target.files && e.target.files?.length > 0) {
          const urlObject = URL.createObjectURL(e.target.files[0]);
          setLogo(urlObject);
        }
      },
    });

  const handleBrowse = () => {
    if (ref.current !== null) {
      ref.current.click();
    }
  };

  const courseItemRenderer = (item: IKeyValue, index: number) => {
    return (
      <Grid
        container
        direction="column"
        alignItems="flex-start"
        justifyContent="center"
        height="100%"
      >
        <Typography className={classes.courseItemNameText}>
          {item.key}
        </Typography>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          flexWrap="nowrap"
        >
          <FontAwesomeIcon
            icon={faLocationDot}
            className={classes.courseItemLocationIcon}
          />
          <Typography className={classes.courseItemLocationText}>
            {item.value.location}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <div className={classes.createTeamContainer}>
      <LeagueNav />
      <TeamBanner logo={logo} abbr={abbr} color={color} />
      <div className={classes.contentWrapper}>
        <Grid
          container
          direction="column"
          className={classes.createTeamContentContainer}
        >
          <Avatar
            onClick={handleBrowse}
            src={logo}
            style={{ backgroundColor: color }}
            className={classes.teamLogo}
          />
          <FileSelector />
          <Typography className={classes.logoText}>Team Logo</Typography>
          <Grid
            container
            direction="column"
            className={classes.propertyContainer}
          >
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.inputLabelText}>
                Team Name
              </Typography>
              <StandardInput
                value={teamName}
                setValue={setTeamName}
                placeholder="Team Name"
              />
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.inputLabelText}>
                Abbreviation
              </Typography>
              <StandardInput
                value={abbr}
                setValue={setAbbr}
                placeholder="Abbreviation"
              />
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.inputLabelText}>
                Home Course
              </Typography>
              <StandardAutocomplete
                value={homeCourse}
                setValue={setHomeCourse}
                searchTerm={searchCourse}
                setSearchTerm={setSearchCourse}
                placeholder="Home Course"
                options={courseOptions}
                itemRenderer={courseItemRenderer}
              />
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.inputLabelText}>Pool</Typography>
              <StandardAutocomplete
                value={pool}
                setValue={setPool}
                placeholder="Pool"
                options={["A", "B", "C", "D", "E", "PIP"]}
              />
            </Grid>
            <Grid
              container
              direction="row"
              alignItems="center"
              justifyContent="center"
            >
              <Typography className={classes.inputLabelText}>
                Team Color
              </Typography>
              <StandardColorSelect color={color} setColor={setColor} />
            </Grid>
          </Grid>
          <StandardButton
            text="Create Team"
            onClick={() => console.log("Create Team")}
            height={leagueLinkTheme.spacing(16)}
          />
        </Grid>
      </div>
    </div>
  );
};

export const CreateTeam = CreateTeamComponent;
