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



// Employee payroll view (read-only)
export async function get_employee_payroll(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    const payroll = await Salary.findOne({ user: decoded.userId })
      .populate("user", "firstName lastName empCode jobPosition department");

    if (!payroll) {
      return res.status(404).json({ 
        success: false, 
        message: "Payroll not found" 
      });
    }

    return res.status(200).json({
      success: true,
      data: payroll,
    });
  } catch (error) {
    console.error("Employee Payroll Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// Admin - View all payrolls
export async function get_all_payrolls(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    if (decoded.role !== Role.ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden" 
      });
    }

    const payrolls = await Salary.find()
      .populate("user", "firstName lastName empCode department jobPosition");

    return res.status(200).json({
      success: true,
      data: payrolls,
    });
  } catch (error) {
    console.error("Admin Payroll Fetch Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}

// Admin - Update salary structure
export async function update_salary_structure(req, res) {
  try {
    const decoded = authorize(req, res);
    if (!decoded) return;

    if (decoded.role !== Role.ADMIN) {
      return res.status(403).json({ 
        success: false, 
        message: "Forbidden" 
      });
    }

    const { userId, salaryData } = req.body;

    if (!userId || !salaryData) {
      return res.status(400).json({ 
        success: false, 
        message: "userId and salaryData are required" 
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid userId" 
      });
    }

    const salary = await Salary.findOneAndUpdate(
      { user: userId },
      salaryData,
      { new: true, upsert: true }
    );

    return res.status(200).json({
      success: true,
      message: "Salary structure updated successfully",
      data: salary,
    });
  } catch (error) {
    console.error("Update Salary Error:", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
}