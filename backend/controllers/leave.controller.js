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



/* ================= LEAVE CONTROLLERS ================= */

// Apply for leave
export async function apply_for_leave(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    const { type, startDate, endDate, totalDays, reason, attachmentUrl } = req.body;

    // Validate required fields
    if (!type || !startDate || !endDate || !totalDays) {
      return res.status(400).json({ 
        success: false, 
        message: "Leave type, dates, and total days are required" 
      });
    }

    const leave = await LeaveRequest.create({
      user: decoded.userId,
      type,
      startDate,
      endDate,
      totalDays,
      reason,
      attachmentUrl,
      status: LeaveStatus.PENDING,
    });

    return res.status(201).json({ 
      success: true, 
      message: "Leave request submitted successfully",
      data: leave 
    });
  } catch (error) {
    console.error("Apply Leave Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// Manage leave (approve/reject)
export async function manage_leave(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    // Only Admin/HR can approve/reject
    if (![Role.ADMIN, Role.HR_OFFICER].includes(decoded.role)) {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden: insufficient permissions" 
      });
    }

    const { requestId, status, adminComment } = req.body;

    if (!requestId || !status) {
      return res.status(400).json({ 
        success: false, 
        message: "requestId and status are required" 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(requestId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid requestId" 
      });
    }

    const leave = await LeaveRequest.findByIdAndUpdate(
      requestId,
      { status, adminComment },
      { new: true }
    ).populate("user", "firstName lastName empCode");

    if (!leave) {
      return res.status(404).json({ 
        success: false, 
        message: "Leave request not found" 
      });
    }

    // Update leave balance if approved
    if (status === LeaveStatus.APPROVED && leave.type !== "Unpaid Leaves") {
      await LeaveBalance.findOneAndUpdate(
        { user: leave.user._id, leaveType: leave.type },
        { $inc: { used: parseFloat(leave.totalDays) } },
        { upsert: true }
      );
    }

    return res.status(200).json({ 
      success: true, 
      message: `Leave request ${status.toLowerCase()} successfully`,
      data: leave 
    });
  } catch (error) {
    console.error("Manage Leave Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// Get leave requests
export async function get_leave_requests(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    const { userId, role, companyId } = decoded;
    const { employeeId, status } = req.query;

    let query = {};

    if (role === Role.EMPLOYEE) {
      // Employees can only see their own leave requests
      query.user = userId;
    } else {
      // Admin/HR can see all company employees' leave requests
      if (employeeId) {
        query.user = employeeId;
      } else {
        const companyUsers = await User.find({ company: companyId }).select("_id");
        const userIds = companyUsers.map(u => u._id);
        query.user = { $in: userIds };
      }
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const leaveRequests = await LeaveRequest.find(query)
      .populate("user", "firstName lastName empCode department")
      .sort({ createdAt: -1 });

    return res.status(200).json({ 
      success: true, 
      data: leaveRequests 
    });
  } catch (error) {
    console.error("Get Leave Requests Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}