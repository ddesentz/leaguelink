import { signal } from "@preact/signals-react";

const createRootSignals = () => {
  return {};
};

export const rootSignals = {
  rootSignals: createRootSignals(),
};

export type IRootSignals = typeof rootSignals;
