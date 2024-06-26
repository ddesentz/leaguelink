import { signal } from "@preact/signals-react";
import { IPlayerData } from "../common/types/NETC/PlayerData";

export const createPlayerSignals = () => {
  const editingPlayer = signal<IPlayerData | null>(null);

  return { editingPlayer };
};
