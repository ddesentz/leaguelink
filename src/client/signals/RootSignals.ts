import { createMatchSignals } from "./MatchSignals";
import { createPlayerSignals } from "./PlayerSignals";
import { createTeamSignals } from "./TeamSignals";

const createRootSignals = () => {
  return {};
};

export const rootSignals = {
  matchSignals: createMatchSignals(),
  teamSignals: createTeamSignals(),
  playerSignals: createPlayerSignals(),
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
