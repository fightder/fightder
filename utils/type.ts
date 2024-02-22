export type Fight = {
  _id: string;
  // title: string;
  sport: string;
  status: string;
  rule: string;
  notes: string;
  datetime: string;
  location: string;
  opponentId: string;
  opponentImage: string;
  opponentName: string;
  inviterId: string;
  inviterImage: string;
  inviterName: string;
  prize: string;
  public: boolean;
  spectators: string[];
};
