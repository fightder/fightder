export type Fight = {
  id: string;
  // title: string;
  sport: string;
  description: string;
  rule: string;
  date: string;
  location: string;
  opponentId: string;
  opponentImage: string;
  inviterId: string;
  inviterImage: string;
  prize: string;
  public: boolean;
  spectators: string[];
};
