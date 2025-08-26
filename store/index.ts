import announcementReducer from "@/store/AnnouncementSlice";
import attendanceReducer from "@/store/AttendanceSlice";
import dashboardSummaryReducer from "@/store/DashboardSlice";
import groupReducer from "@/store/groupSlice";
import messageReducer from "@/store/messagesSlice";
import postReducer from "@/store/postSlice";
import reportReducer from "@/store/ReportSlice";
import teamsReducer from "@/store/teamsSlice";
import transactionReducer from "@/store/TransactionSlice";
import userReducer from "@/store/userByIdSlice";
import usersReducer from "@/store/usersSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
    teams: teamsReducer,
    attendances: attendanceReducer,
    announcements: announcementReducer,
    dashboardSummary: dashboardSummaryReducer,
    transactions: transactionReducer,
    report: reportReducer,
    posts: postReducer,
    groups: groupReducer,
    message: messageReducer
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
