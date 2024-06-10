export interface IMatchPlayMatchup {
  homePlayer: {
    playerId: string;
    firstName: string;
    lastName: string;
    photoURL: string;
  };
  awayPlayer: {
    playerId: string;
    firstName: string;
    lastName: string;
    photoURL: string;
  };
  score: {
    home: number;
    away: number;
    result: string;
  };
}
