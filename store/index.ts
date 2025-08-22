import announcementReducer from "@/store/AnnouncementSlice";
import attendanceReducer from "@/store/AttendanceSlice";
import dashboardSummaryReducer from "@/store/DashboardSlice";
import teamsReducer from "@/store/teamsSlice";
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
  },
});

// Types for use in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
