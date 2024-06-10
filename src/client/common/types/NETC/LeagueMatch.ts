export interface ILeagueMatch {
  id: string;
  homeTeam: {
    abbr: string;
    id: string;
    photoURL: string;
  };
  awayTeam: {
    abbr: string;
    id: string;
    photoURL: string;
  };
  score: {
    home: number;
    away: number;
  };
  status: string;
  date: number;
}
