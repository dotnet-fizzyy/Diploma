import { IUser } from "./userTypes";

export interface ITeam {
  users: IUser[];
  teamId: string;
  teamName: string;
  location: string;
  membersCount: number;
}
