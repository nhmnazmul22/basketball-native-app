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
  createdAt?: string;
  updatedAt?: string;
}

export interface Team {
  _id: string;
  logo: string;
  name: string;
  description: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Attendance {
  _id: string;
  studentId: string;
  teamId: string;
  status: "present" | "absent" | "late";
  gps: boolean;
  faceMatch: boolean;
  studentName: string;
  studentEmail: string;
  teamName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Announcement {
  _id?: string;
  title: string;
  message: string;
  date: string;
  teamId: string;
  teamDetails: Team;
  status: string;
  isPinned: boolean;
  createdAt?: string;
  updatedAt?: string;
}
