import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User, Attendance, LeaveRequest } from "./models.js"; // adjust path to your models

// // employer dashboard
// export async function employeeDashboardController(req, res) {
//   try {
//     // JWT from headers
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

//     // JWT
//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(401).json({ success: false, message: "Invalid token" });
//     }

//     const userId = decoded.userId;
//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(401).json({ success: false, message: "Unauthorized" });
//     }

//     // Fetch user profile
//     const user = await User.findById(userId)
//       .select("-password")
//       .populate("company", "name logoUrl");

//     if (!user) return res.status(404).json({ success: false, message: "User not found" });

//     // Quick-access cards
//     const quickAccess = [
//       { name: "Profile", link: "/dashboard/profile" },
//       { name: "Attendance", link: "/dashboard/attendance" },
//       { name: "Leave Requests", link: "/dashboard/leave-requests" },
//       { name: "Logout", link: "/logout" },
//     ];

//     // Recent attendance
//     const recentAttendance = await Attendance.find({ user: userId })
//       .sort({ date: -1 })
//       .select("date checkIn checkOut status workHours extraHours");

//     // Recent leave requests
//     const recentLeaveRequests = await LeaveRequest.find({ user: userId })
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select("type startDate endDate status totalDays reason");

//     // Alerts
//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const todaysAttendance = await Attendance.findOne({ user: userId, date: today });
//     const pendingLeaves = await LeaveRequest.find({ user: userId, status: "PENDING" });

//     const alerts = [];
//     if (!todaysAttendance) alerts.push("No attendance recorded for today.");
//     else if (todaysAttendance.status === "ABSENT") alerts.push("You are marked absent today!");

//     if (pendingLeaves.length > 0) alerts.push(`You have ${pendingLeaves.length} pending leave request(s).`);

//     //  response
//     return res.status(200).json({
//       success: true,
//       user,
//       quickAccess,
//       recentActivities: {
//         attendance: recentAttendance,
//         leaveRequests: recentLeaveRequests,
//       },
//       alerts,
//     });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ success: false, message: "Internal server error" });
//   }
// }



export async function GetAllEmployess(req , res) {
  try{
    //to fetch employees with their status of attendance

    const employees = await User.find({ role: "EMPLOYEE" })
      .select("-password")
      .populate("company", "name logoUrl")
      .populate({
        path: "attendanceStatus",
        select: "status date",
      });

    return res.status(200).json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });  
  }
}



export async function EditEmployeeProfile(req , res) {
  try{
   // it takes the employee edited data which is given and then edit that part of employee data 
    const {email , firstName , lastName , phone ,  department , location , panNo , accountNumber , ifscCode , uanNo , dateOfBirth , nationality , martialstatus } = req.body;


    const updateUser = await User.find({email : email});
    if(!updateUser){
      return res.json({
        success : false,
        message : "User not found"
      })
    }

    updateUser.firstName = firstName? firstName : updateUser.firstName ;
    updateUser.lastName = lastName? lastName : updateUser.lastName ;
    updateUser.phone = phone? phone : updateUser.phone ;
    updateUser.department = department ? department : updateUser.department;
    updateUser.location = location ? location : updateUser.location ;
    updateUser.panNo = panNo ? panNo : updateUser.panNo ;
    updateUser.accountNumber = accountNumber ? accountNumber : updateUser.accountNumber ;
    updateUser.ifscCode = ifscCode ? ifscCode : updateUser.ifscCode ;
    updateUser.uanNo = uanNo ? uanNo : updateUser.uanNo ;
    updateUser.dateOfBirth = dateOfBirth ? dateOfBirth : updateUser.dateOfBirth ;
    updateUser.nationality = nationality ? nationality : updateUser.nationality ;
    updateUser.martialstatus = martialstatus ? martialstatus : updateUser.martialstatus ;
    
    await updateUser.save();

  }
  catch(error){
   return res.status(500).json({
      success: false,
      message: "Internal server error"
   })
  }
  
}






export async function GetEmployeeProfile(req , res) { 
  try{
    // to get the employee profile data when employer wants to see it
    const { email } = req.params;
    
    const user = await User.findOne({ email: email })
      .select("-password")
      .populate("company", "name logoUrl");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


export async function GetEmployeeAttendance(req , res) {
  try{
    // to get the attendance of a particular employee when employer wants to see it
    const { email } = req.params;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const attendanceRecords = await Attendance.find({ user: user._id })
      .sort({ date: -1 })
      .select("date checkIn checkOut status workHours extraHours");

    return res.status(200).json({
      success: true,
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}


// export async function GetEmployeeSalary(req  , res) {
//   try{

//   }
//   catch(error){
    
//   }
  
// }


export async function GetEmployeeAttendance(req , res){
  try{
    const { email } = req.params;
    
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const attendanceRecords = await Attendance.find({ user: user._id })
      .sort({ date: -1 })
      .select("date checkIn checkOut status workHours extraHours");

    return res.status(200).json({
      success: true,
      attendanceRecords,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}