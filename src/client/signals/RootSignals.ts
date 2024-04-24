import { createMatchSignals } from "./MatchSignals";

const createRootSignals = () => {
  return {};
};

export const rootSignals = {
  matchSignals: createMatchSignals(),
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
