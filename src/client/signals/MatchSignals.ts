import { signal } from "@preact/signals-react";
import { ILeagueMatch } from "../common/types/NETC/LeagueMatch";

export const createMatchSignals = () => {
  const selectedMatch = signal<ILeagueMatch | null>(null);

  return { selectedMatch };
};
