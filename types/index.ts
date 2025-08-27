export interface Session {
  user_id: string;
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
  status: "hadiah" | "absen" | "terlambat";
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

export interface DashboardSummary {
  summary: {
    totalStudent: number;
    totalCoach: number;
    paymentPending: number;
    netIncome: number;
  };
  attendanceReport: {
    totalPresent: number;
    totalAbsent: number;
    late: number;
    averageAttendance: number;
  };
}

export interface Transaction {
  _id: string;
  studentId: string;
  amount: number;
  method: string;
  type: "penghasilan" | "pengeluaran";
  status: "dibayar" | "dibatalkan" | "menunggu";
  remark: string;
  studentInfo: User;
  createdAt: string;
  updatedAt: string;
}

export interface Reports {
  summary: {
    totalStudent: number;
    totalCoach: number;
    averageAttendance: number;
    paymentPaid: number;
    paymentPending: number;
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
  };
  attendanceGraph: any;
  incomeGraph: any;
}

export interface Post{
  _id: string;
  authorName: string;
  title: string;
  description: string;
  like?:number |string;
  createdAt: string;
  updatedAt: string; 
}

export interface Group {
  _id: string;
  logo?: string;
  groupName: string;
  description: string;
  status: string;
  membersIds: [string];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  _id: string;
  message: string;
  senderId: string;
  groupId: string;
  avater: string;
  senderDetails: User;
  createdAt: string;
  updatedAt: string;
}