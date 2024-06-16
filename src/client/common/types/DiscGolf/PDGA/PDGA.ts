export interface IPDGAPlayerResult {
  ResultID: number;
  Place: number;
  Rating: number;
  TierLetter: string;
  ToParString: string;
  RatingDiff: number;
  AverageRoundRating: number;
  Division: string;
  DNF: boolean;
  Scores: any[];
}

export interface IPDGATournamentResult {
  tournamentId: string;
  division: string;
  details: {
    name: string;
    tier: string;
    startDate: number;
    endDate: number;
  };
  playerResults?: IPDGAPlayerResult;
  isLeague?: boolean;
}
