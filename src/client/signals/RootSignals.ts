import { createMatchSignals } from "./MatchSignals";
import { createTeamSignals } from "./TeamSignals";

const createRootSignals = () => {
  return {};
};

export const rootSignals = {
  matchSignals: createMatchSignals(),
  teamSignals: createTeamSignals(),
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
