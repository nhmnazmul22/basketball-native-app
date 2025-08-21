export interface Session {
  userId: string;
  email: string;
  role: string;
}

export interface User {
  _id?: string;
  profilePicture?: string;
  fullName: string;
  dob?: string;
  email: string;
  team: string;
  role: string;
  status: string;
  phone?: string;
  faceDescriptor?: Number[];
  teamDetails?: any;
  teamId?: string;
}
