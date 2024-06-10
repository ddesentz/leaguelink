import { IPlayerData } from "./PlayerData";

export interface IDoublesMatchup {
  home: IPlayerData[];
  away: IPlayerData[];
  score: {
    home: number;
    away: number;
    result: {
      home: number;
      away: number;
      playOffHoles: number;
    };
  };
}
