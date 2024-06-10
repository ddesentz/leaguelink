import { signal } from "@preact/signals-react";
import { ITeamData } from "../common/types/NETC/TeamData";

export const createTeamSignals = () => {
  const editingTeam = signal<ITeamData | null>(null);

  return { editingTeam };
};
