import mongoose from "mongoose";


// enums 
export const Role = {
  ADMIN: "ADMIN",
  HR_OFFICER: "HR_OFFICER",
  EMPLOYEE: "EMPLOYEE",
};

export const AttendanceStatus = {
  PRESENT: "PRESENT",
  ABSENT: "ABSENT",
  ON_LEAVE: "ON_LEAVE",
  HALF_DAY: "HALF_DAY",
};

export const LeaveStatus = {
  PENDING: "PENDING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
};

// company 
const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    logoUrl: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);


// user 
const userSchema = new mongoose.Schema(
  {
    loginId: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: Object.values(Role),
      default: Role.EMPLOYEE,
    },

    // Profile
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phone: { type: String },
    jobPosition: { type: String },
    department: { type: String },
    location: { type: String },
    dateOfJoining: { type: Date },

    // Bank & IDs
    panNo: { type: String },
    accountNumber: { type: String },
    ifscCode: { type: String },
    uanNo: { type: String },
    empCode: { type: String, unique: true },

    // Relations
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },
  },
  { timestamps: true }
);

// salary
const salarySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    unique: true,
    required: true,
  },

  // Basic
  monthlyWage: { type: mongoose.Schema.Types.Decimal128, required: true },
  yearlyWage: { type: mongoose.Schema.Types.Decimal128, required: true },
  workingDaysWeek: { type: Number, default: 5 },
  breakTimeHrs: { type: mongoose.Schema.Types.Decimal128 },

  // Components
  basicSalary: { type: mongoose.Schema.Types.Decimal128 },
  hra: { type: mongoose.Schema.Types.Decimal128 },
  standardAllowance: { type: mongoose.Schema.Types.Decimal128 },
  performanceBonus: { type: mongoose.Schema.Types.Decimal128 },
  lta: { type: mongoose.Schema.Types.Decimal128 },
  fixedAllowance: { type: mongoose.Schema.Types.Decimal128 },

  // Deductions
  pfEmployee: { type: mongoose.Schema.Types.Decimal128 },
  pfEmployer: { type: mongoose.Schema.Types.Decimal128 },
  professionalTax: {
    type: mongoose.Schema.Types.Decimal128,
    default: 200.0,
  },
});

// attenance
const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: { type: Date, required: true },
    checkIn: { type: Date },
    checkOut: { type: Date },
    workHours: { type: mongoose.Schema.Types.Decimal128 },
    extraHours: { type: mongoose.Schema.Types.Decimal128 },
    status: {
      type: String,
      enum: Object.values(AttendanceStatus),
      default: AttendanceStatus.ABSENT,
    },
  },
  { timestamps: true }
);

// Unique: one record per user per day
attendanceSchema.index({ user: 1, date: 1 }, { unique: true });



const leaveBalanceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  leaveType: { type: String, required: true },
  totalAllocated: { type: mongoose.Schema.Types.Decimal128, required: true },
  used: {
    type: mongoose.Schema.Types.Decimal128,
    default: 0,
  },
});

leaveBalanceSchema.index({ user: 1, leaveType: 1 }, { unique: true });

/// leave request schema
const leaveRequestSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: { type: String, required: true }, // Paid / Sick / Unpaid
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    totalDays: { type: mongoose.Schema.Types.Decimal128, required: true },
    reason: { type: String },
    attachmentUrl: { type: String },
    status: {
      type: String,
      enum: Object.values(LeaveStatus),
      default: LeaveStatus.PENDING,
    },
    adminComment: { type: String },
  },
  { timestamps: true }
);

// models 
export const Company = mongoose.model("Company", companySchema);
export const User = mongoose.model("User", userSchema);
export const Salary = mongoose.model("Salary", salarySchema);
export const Attendance = mongoose.model("Attendance", attendanceSchema);
export const LeaveBalance = mongoose.model("LeaveBalance", leaveBalanceSchema);
export const LeaveRequest = mongoose.model("LeaveRequest", leaveRequestSchema);
