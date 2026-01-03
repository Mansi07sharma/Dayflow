import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { 
  Salary, 
  User, 
  Role, 
  Company,
  Attendance,
  AttendanceStatus,
  LeaveRequest,
  LeaveBalance,
  LeaveStatus
} from "../models/sample.model.js";

// Centralized JWT secret
const JWT_SECRET = process.env.JWT_SECRET || "Sample_Secret_Key_Change_In_Production";

/* ================= SHARED AUTH HELPER ================= */
function authorize(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return null;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!mongoose.Types.ObjectId.isValid(decoded.userId)) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return null;
    }
    return decoded;
  } catch {
    res.status(401).json({ success: false, message: "Invalid token" });
    return null;
  }
}


/* ================= ATTENDANCE CONTROLLERS ================= */

// Post attendance record (check-in/check-out)
export async function post_attendance_record(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    const userId = decoded.userId;
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    let attendance = await Attendance.findOne({ user: userId, date: today });

    if (!attendance) {
      // Check-in
      attendance = await Attendance.create({
        user: userId,
        date: today,
        checkIn: now,
        status: AttendanceStatus.PRESENT,
      });

      return res.status(201).json({ 
        success: true, 
        message: "Check-in recorded successfully", 
        data: attendance 
      });
    }

    if (attendance.checkIn && !attendance.checkOut) {
      // Check-out
      attendance.checkOut = now;

      const hours = (attendance.checkOut - attendance.checkIn) / (1000 * 60 * 60);
      attendance.workHours = parseFloat(hours.toFixed(2));
      
      const standardShift = 9;
      attendance.extraHours = hours > standardShift 
        ? parseFloat((hours - standardShift).toFixed(2)) 
        : 0;

      await attendance.save();
      return res.status(200).json({ 
        success: true, 
        message: "Check-out recorded successfully", 
        data: attendance 
      });
    }

    return res.status(400).json({ 
      success: false, 
      message: "Attendance for today has already been completed" 
    });
  } catch (error) {
    console.error("Attendance Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// Get attendance list
export async function get_attendance_list(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    const { userId, role, companyId } = decoded;
    const { employeeId, month, year } = req.query;

    let query = {};

    if (role === Role.EMPLOYEE) {
      // Employees can only see their own attendance
      query.user = userId;
    } else {
      // Admin/HR can see all company employees
      const companyUsers = await User.find({ company: companyId }).select("_id");
      const userIds = companyUsers.map(u => u._id);
      query.user = employeeId ? employeeId : { $in: userIds };
    }

    // Filter by month and year if provided
    if (month && year) {
      const startDate = new Date(year, month - 1, 1);
      const endDate = new Date(year, month, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    }

    const attendanceRecords = await Attendance.find(query)
      .populate("user", "firstName lastName empCode")
      .sort({ date: -1 });

    return res.status(200).json({ 
      success: true, 
      data: attendanceRecords 
    });
  } catch (error) {
    console.error("Fetch Attendance Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}
