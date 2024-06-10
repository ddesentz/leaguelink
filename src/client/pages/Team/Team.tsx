import * as React from "react";
import { teamStyles } from "./TeamStyles";
import { LeagueNav } from "../../components/LeagueNav/LeagueNav";
import { TeamBanner } from "../../components/_common/TeamBanner/TeamBanner";
import { useParams } from "react-router";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../..";
import { LoadingFull } from "../../common/rive/LoadingFull";
import { ITeamData } from "../../common/types/NETC/TeamData";
import { TeamDetails } from "../../components/Team/TeamDetails/TeamDetails";
import { Tab, Tabs } from "@mui/material";

interface ITeam {}

const TeamComponent: React.FunctionComponent<ITeam> = () => {
  const { classes } = teamStyles();
  const { leagueId, teamId } = useParams();
  const [team, setTeam] = React.useState<ITeamData | null>(null);
  const [selectedTab, setSelectedTab] = React.useState<string>("Schedule");

  React.useEffect(() => {
    const teamSnapshot = onSnapshot(
      doc(db, "leagues", leagueId, "teams", teamId),
      (doc) => {
        if (doc.exists())
          setTeam({ teamId: teamId, ...doc.data() } as ITeamData);
      }
    );

    return () => teamSnapshot();
  }, [leagueId, teamId]);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue);
  };

  return (
    <div className={classes.teamContainer}>
      <LeagueNav />
      {team !== null && (
        <TeamBanner
          logo={team.photoURL}
          abbr={team.abbr}
          color={team.teamColor}
        />
      )}
      <div className={classes.contentWrapper}>
        {team === null ? (
          <div className={classes.loadingModal}>
            <LoadingFull className={classes.loading} />
          </div>
        ) : (
          <>
            <TeamDetails teamData={team} />
            <div className={classes.matchContent}>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                className={classes.tabs}
                TabIndicatorProps={{
                  className: classes.tabIndicator,
                }}
              >
                <Tab
                  label={"Schedule"}
                  value={"Schedule"}
                  disableRipple
                  className={classes.tab}
                />
                <Tab
                  label="Roster"
                  value={"Roster"}
                  disableRipple
                  className={classes.tab}
                />
              </Tabs>
              {selectedTab === "Schedule" ? <h1>Schedule</h1> : <h1>Roster</h1>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Team = TeamComponent;
