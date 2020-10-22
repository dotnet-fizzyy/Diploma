export interface IUser {
  userId: string;
  userName: string;
  userRole: UserRole;
  userPosition: UserPosition;
  isActive: boolean;
  avatarLink: string;
  email: string;
}

export enum UserRole {
  ProductOwner = "ProductOwner",
  TeamMaster = "TeamMaster",
  Lead = "Lead",
  Engineer = "Engineer",
}

export enum UserPosition {
  Developer = "Developer",
  Qa = "Qa",
  DevOps = "DevOps",
  Architecture = "Architecture",
  Customer = "Customer",
}
