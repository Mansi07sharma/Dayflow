import express from "express";
import {
  // Authentication
  create_company_account,
  user_account_Creation,
  user_signin,
  
  // Payroll
  get_employee_payroll,
  get_all_payrolls,
  update_salary_structure,
  
  // Attendance
  post_attendance_record,
  get_attendance_list,
  
  // Leave Management
  apply_for_leave,
  manage_leave,
  get_leave_requests,
} from "../controllers/hrms.controller.js";

const router = express.Router();

// all routes 
router.post("/auth/company/register", create_company_account);
router.post("/auth/register", user_account_Creation);
router.post("/auth/login", user_signin);
router.get("/payroll/employee", get_employee_payroll);
router.get("/payroll/all", get_all_payrolls);
router.put("/payroll/update", update_salary_structure);
router.post("/attendance/checkin-checkout", post_attendance_record);
router.get("/attendance/list", get_attendance_list);
router.post("/leave/apply", apply_for_leave);
router.put("/leave/manage", manage_leave);
router.get("/leave/requests", get_leave_requests);

export default router;