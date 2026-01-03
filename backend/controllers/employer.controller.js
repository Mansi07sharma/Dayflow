import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User, Attendance, LeaveRequest } from "./models.js"; // adjust path to your models

// employer dashboard
export async function employeeDashboardController(req, res) {
  try {
    // JWT from headers
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

    // JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const userId = decoded.userId;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user profile
    const user = await User.findById(userId)
      .select("-password")
      .populate("company", "name logoUrl");

    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Quick-access cards
    const quickAccess = [
      { name: "Profile", link: "/dashboard/profile" },
      { name: "Attendance", link: "/dashboard/attendance" },
      { name: "Leave Requests", link: "/dashboard/leave-requests" },
      { name: "Logout", link: "/logout" },
    ];

    // Recent attendance
    const recentAttendance = await Attendance.find({ user: userId })
      .sort({ date: -1 })
      .select("date checkIn checkOut status workHours extraHours");

    // Recent leave requests
    const recentLeaveRequests = await LeaveRequest.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("type startDate endDate status totalDays reason");

    // Alerts
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysAttendance = await Attendance.findOne({ user: userId, date: today });
    const pendingLeaves = await LeaveRequest.find({ user: userId, status: "PENDING" });

    const alerts = [];
    if (!todaysAttendance) alerts.push("No attendance recorded for today.");
    else if (todaysAttendance.status === "ABSENT") alerts.push("You are marked absent today!");

    if (pendingLeaves.length > 0) alerts.push(`You have ${pendingLeaves.length} pending leave request(s).`);

    //  response
    return res.status(200).json({
      success: true,
      user,
      quickAccess,
      recentActivities: {
        attendance: recentAttendance,
        leaveRequests: recentLeaveRequests,
      },
      alerts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}
